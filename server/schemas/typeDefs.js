const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    groups: [Group]
  }

  type Message {
    body: String
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
    userByName(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createGroup(name: String!, admin: ID!): Group
    updateGroup(groupId: ID!, name: String!, admin: ID!): Group
    deleteGroup(groupId: ID!, admin: ID!): Group
    addGroupMember(userId: ID!, groupId: ID!, admin: ID!): Group
    removeGroupMember(userId: ID!, groupId: ID!, admin: ID!): Boolean
    postMessage(body: String!, groupId: ID!, username: String!):Group
  }

  type Subscription {
    messageAdded: MessageSubscriptionPayload!
  }

  type MessageSubscriptionPayload {
    mutation: String!
    data: Message!
  }
  
`;

module.exports = typeDefs;
