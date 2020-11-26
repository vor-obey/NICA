import { ApolloClient, InMemoryCache } from '@apollo/client';
import { apolloClient } from '../configs/app';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  ...apolloClient,
  cache,
});

export default client;
