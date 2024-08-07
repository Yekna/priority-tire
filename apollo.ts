import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.HYGRAPH_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

export default client;
