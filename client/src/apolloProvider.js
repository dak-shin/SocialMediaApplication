import React from 'react';
import App from './App';

import {URI} from './data';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';


console.log(URI);
const client = new ApolloClient({
    link: URI,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>

);

