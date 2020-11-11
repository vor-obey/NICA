import { ApolloClient, InMemoryCache } from '@apollo/client';

const baseURL = 'https://48p1r2roz4.sse.codesandbox.io';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

export default client;
