import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    email
    username
    groups {
      _id
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