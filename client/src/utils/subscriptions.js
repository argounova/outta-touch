import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
subscription OnMessageAdded($groupId: ID!) {
  messageAdded (groupId: $groupId) {
    mutation
    data {
      messages {
        body
        timestamp
        user {
          username
        }
      }
    }
  }
}
`