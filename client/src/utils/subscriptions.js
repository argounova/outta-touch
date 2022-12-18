const MESSAGE_SUBSCRIPTION = gql`
subscription OnMessageAdded($groupId: ID!) {
    messageAdded(groupId: $groupId) {
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