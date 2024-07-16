import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.HYGRAPH_ENDPOINT ||
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clusbu5q5000001w3bpws6ij7/master",
  }),
  cache: new InMemoryCache(),
});

export default client;
