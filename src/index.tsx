import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// -----------------------------------  configuration for normal api Auth and Non-Auth ---------------------------

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

// for subscription 
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from './constants';

// 2
const httpLink = createHttpLink({
  uri: 'http://13.74.23.108/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


// -----------------------------------  configuration for continues connection with server for subscription  ---------------------------

const wsLink = new WebSocketLink({
  uri: `ws://13.74.23.108:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// 3
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

// 4
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
