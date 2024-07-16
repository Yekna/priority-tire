import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// TODO: not a fan of this but cors isn't letting me use magento
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const magento = new ApolloClient({
  link: new HttpLink({
    uri: "https://magento.test/graphql",
  }),
  cache: new InMemoryCache(),
});

export default magento;
