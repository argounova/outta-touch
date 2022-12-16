import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './utils/auth';

/// Pages ///
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

/// Components ///
import ProtectRoute from './components/ProtectRoute';

import './App.css';

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

/// SET UP CLIENT ///
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
