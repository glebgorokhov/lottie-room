const { ApolloClient, HttpLink, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://graphql.lottiefiles.com/2022-08", fetch }),
  cache: new InMemoryCache(),
});

export default client;
