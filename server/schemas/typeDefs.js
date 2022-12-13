const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    groups: [Group]
  }

  type Group {
    _id: ID
    name: String
    members: [
      {
        user: User
        isAdmin: Boolean
      }
    ]
    messages: [
      {
        message: String
        user: User
        timestamp: Date
        updated: Boolean
      }
    ]
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
  }
`;

module.exports = typeDefs;
