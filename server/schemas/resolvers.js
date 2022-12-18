const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");

const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    /// GETS ONE USER ///
    user: async (parent, { userId }, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: userId }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");

    },
    group: async (parent, { groupId }, context) => {

      const groupData = await Group.findById(groupId);
      
      return groupData;
    },
    userByName: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    postMessage: async (parent, {body, groupId, username}) => {
      
        const addMessageData = await Group.findByIdAndUpdate(groupId,
          {$push: {
            messages: {
              body: body,
              user: {
                username: username
              }
            }
          }}
        );

        pubsub.publish('messageAdded', {
          messageAdded:{
            mutation: 'MESSAGE_SUBSCRIPTION',
            data: addMessageData
          }
        })

        return addMessageData;
    },
    /// ADD USER ///
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    /// LOGIN ///
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    createGroup: async (parent, { name, admin }, context) => {
      const groupData = await Group.create({
        name: name,
        members: [admin],
        admins: [admin],
      });
      // console.log(groupData);

      await User.findByIdAndUpdate(context.user._id,
        { $addToSet: { groups: groupData } });

      console.log('successfully created group');
      return (groupData);
    },
    updateGroup: async (parent, { groupId, name, admin }, context) => {
      const groupData = await Group.findById(groupId);
      let isAdmin = groupData.admins.find((element) => element === admin);
      if (!isAdmin) return;
      groupData.name = name;
      groupData.save();
      return groupData;
    },
    // TODO: Delete group from all users' groups array
    deleteGroup: async (parent, { groupId, admin }, context) => {
      const groupData = await Group.findById(groupId);
      let isAdmin = groupData.admins.find((element) => element === admin);
      if (!isAdmin) return;
      const groupDelete = await Group.findByIdAndDelete(groupId);
      return groupDelete;
    },
    addGroupMember: async (parent, { userId, groupId, admin }, context) => {

      const userData = await User.findById(userId);

      if (admin === context.user._id) {

        const groupData = await Group.findByIdAndUpdate(groupId,
          { $addToSet: { members: userData._id } });

          // TODO: Maybe? So, pushing the members and admins  array to the users groups array is causing the user to have duplications of the same group in their array. Removing those fields seems to solve the problem... Most chat page rendering should come from querying the group model so i dont think this will end up being an issue. Its nice to have that information in the user groups array but i dont think it will be neccessary... 
        // calling this last so the user's groups array gets the full list of mbrs
        await User.findByIdAndUpdate(userId,
          { $addToSet: { 
            groups: {
              name: groupData.name,
              _id: groupData._id,
            }
          } });

        // console.log(testUser);
        console.log('Successfully added group member')

        return groupData;

      }
      else {
        console.log('You must be an admin to do that!');

      };
    },
    removeGroupMember: async (parent, { userId, groupId, admin }, context) => {
      const groupData = await Group.findById(groupId);
      let isAdmin = groupData.admins.find((element) => element === admin);
      if (!isAdmin) return;
      let index = groupData.members.findIndex(
        (element) => element.user === userId
      );
      if (index < 0) {
        return false;
      }
      const userData = await User.findById(userId);
      groupData.members.splice(index, 1);
      let j = userData.groups.findIndex((element) => element === groupId);
      if (!(j < 0)) userData.groups.splice(j, 1);
      groupData.save();
      userData.save();
      return true;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe(parent, {body, groupId, username}) {

      return pubsub.asyncIterator('messageAdded')
      }
    },
  },
};

module.exports = resolvers;
