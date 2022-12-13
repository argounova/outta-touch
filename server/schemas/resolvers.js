const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
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
    addGroupMember: async (parent, { userId, groupId }, context) => {
      const groupData = await Group.findById(groupId);
      if (groupData.members.find((element) => element.user === userId)) {
        return;
      }
      groupData.members.push({ user: userId });
      groupData.save();
      return;
    },
    removeGroupMember: async (parent, { userId, groupId }, context) => {
      const groupData = await Group.findById(groupId);
      let index = groupData.members.findIndex(
        (element) => element.user === userId
      );
      if (index === -1) {
        return;
      }
      groupData.members.splice(index, 1);
      groupData.save();
      return;
    },
  },
};

module.exports = resolvers;
