import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
subscription messageAdded {
  messageAdded {
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