import React from 'react';
import App from './App';

import {URI} from './data';
import {  ApolloClient, createHttpLink ,InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const httpLink = createHttpLink({
    uri:URI
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools:true
});


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

