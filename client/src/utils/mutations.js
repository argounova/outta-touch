import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
      groups {
        _id
      }
    }
  }
}
`;

export const LOGIN_USER = gql`
 mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      _id
      username
    }
  }
}
`;

export const CREATE_GROUP = gql`
mutation createGroup($name: String!, $admin: ID!) {
  createGroup(name: $name, admin: $admin) {
    _id
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
    name
  }
}
`
export const ADD_GROUP_MEMBER = gql`
mutation addGroupMember($userId: ID!, $groupId: ID!, $admin: ID!) {
  addGroupMember(userId: $userId, groupId: $groupId, admin: $admin) {
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
`

export const DELETE_GROUP = gql`
mutation deleteGroup($groupId: ID!, $admin: ID!) {
  deleteGroup(groupId: $groupId, admin: $admin) {
    _id
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
    name
  }
}
`

export const REMOVE_GROUP_MEMBER = gql`
mutation removeGroupMember($userId: ID!, $groupId: ID!, $admin: ID!) {
  removeGroupMember(userId: $userId, groupId: $groupId, admin: $admin)
}
`

export const UPDATE_GROUP = gql`
mutation updateGroup($groupId: ID!, $name: String!, $admin: ID!) {
  updateGroup(groupId: $groupId, name: $name, admin: $admin) {
    _id
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
    name
  }
}
`
export const POST_MESSAGE = gql`
mutation postMessage($body: String!, $groupId: ID!, $username: String!) {
  postMessage(body: $body, groupId: $groupId, username: $username) {
    messages {
      body
      user {
        username
      }
      timestamp
    }
  }
}
`