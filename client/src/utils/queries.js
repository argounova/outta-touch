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
      messages {
        message
        timestamp
        updated
      }
      members {
        _id
        email
        username
      }
      admins {
        _id
        email
        username
      }
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
      message
      timestamp
      updated
    }
  }
}
`;