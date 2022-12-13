const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");

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
  },

  Mutation: {
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
      return groupData;
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
      const groupData = await Group.findById(groupId);
      let isAdmin = groupData.admins.find((element) => element === admin);
      if (!isAdmin) return;
      if (groupData.members.find((element) => element.user === userId)) {
        return false;
      }
      groupData.members.push({ user: userId });
      groupData.save();
      return true;
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
      groupData.members.splice(index, 1);
      groupData.save();
      return true;
    },
  },
};

module.exports = resolvers;
