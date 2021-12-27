import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "../sass/main.scss";

const httpLink = createHttpLink({
  uri: "https://devapi.tryotel.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("TOKEN");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "https://devapi.tryotel.com/graphql",
//   cache: new InMemoryCache(),
// });

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
