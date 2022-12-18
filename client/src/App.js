import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Web Socket:
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import Auth from './utils/auth';

/// Pages ///
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

/// Components ///
import ProtectRoute from './components/ProtectRoute';

import './App.css';

// Web Socket:
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
}));

const httpLink = createHttpLink({
  uri: '/graphql',
});

/// SET CONTEXT ///
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const myHttpLink = authLink.concat(httpLink);

// Web Socket:
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  myHttpLink,
);

/// SET UP CLIENT ///
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path='/'
            element={Auth.loggedIn() ? <Dashboard /> : <Landing />}
          />
          <Route
            path='/dashboard'
            element={Auth.loggedIn() ? <Dashboard /> : <ProtectRoute />}
          />
          <Route
          path='/chat'
          element={Auth.loggedIn() ? <Chat /> : <ProtectRoute />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
