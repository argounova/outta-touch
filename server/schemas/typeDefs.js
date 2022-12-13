const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    groups: [Group]
  }

  type Message {
    message: String
    user: User
    timestamp: Date
    updated: Boolean
  }

  scalar Date

  type Group {
    _id: ID
    name: String
    members: [User]
    admins: [User]
    messages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    group(groupId: ID!): Group
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createGroup(name: String!, admin: Auth!): Group
    updateGroup(groupId: ID!, name: String!, admin: Auth!): Group
    deleteGroup(groupId: ID!, admin: Auth!): Group
    addGroupMember(userId: ID!, groupId: ID!, admin: Auth!): Boolean
    removeGroupMember(userId: ID!, groupId: ID!, admin: Auth!): Boolean
  }
`;

module.exports = typeDefs;
