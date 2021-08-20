
// -----------------------------------  configuration for normal api Auth and Non-Auth ---------------------------

// 1
import {
    ApolloClient,
    // createHttpLink,
    InMemoryCache,
} from '@apollo/client';

import { createUploadLink } from "apollo-upload-client";

// for subscription 
import { split } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from '../constants';

// 2

/* const httpLink = createHttpLink({ uri: 'http://13.74.23.108/graphql' }); */

const httpLink = createUploadLink({
    uri: 'http://20.105.0.40:5009/graphql',
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

// const wsLink = new WebSocketLink({
//   uri: `ws://13.74.23.108:4000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN)
//     }
//   }
// });

const link = split(
    ({ query }) => {
        const { kind, /* operation */ }: any = getMainDefinition(query);
        return (
            kind === 'OperationDefinition'
            // &&
            // operation === 'subscription'
        );
    },
    // wsLink,
    authLink.concat(httpLink)
);

// 3
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    customers: {
                        keyArgs: false,
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        },
                    }
                }
            }
        }
    }),
});

export default client;