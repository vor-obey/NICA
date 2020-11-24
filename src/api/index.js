import { ApolloClient, InMemoryCache } from '@apollo/client';
import { graphQLClient } from '../config';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  ...graphQLClient,
  cache,
});

export default client;
