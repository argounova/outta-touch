import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    email
    username
    groups {
      _id
      name
    }
  }
}
`;

export const QUERY_GROUP = gql`
query group($groupId: ID!) {
  group(groupId: $groupId) {
    _id
    name
    admins {
      _id
      email
      username
    }
    members {
      _id
      email
      username
    }
    messages {
      body
      timestamp
      user {
        username
      }
    }
  }
}
`;

export const QUERY_USER_BY_NAME = gql`
query userByName($username: String!) {
  userByName(username: $username) {
    _id
  }
}
`