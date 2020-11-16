import { ApolloClient, InMemoryCache } from '@apollo/client';

const baseURL = 'https://48p1r2roz4.sse.codesandbox.io';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: baseURL,
  cache,
});

export default client;
