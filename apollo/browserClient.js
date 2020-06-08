import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const fetch = require('cross-fetch');

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const resolvers = {
  Mutation: {
    setLandingUrl: (_root, { landing_url }) => {
      cache.writeData({
        data: {
          landing_url: {
            __typename: 'url_location',
            ...landing_url,
          },
        },
      });

      return null;
    },
  },
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const deserializedAuthState = JSON.parse(localStorage?.getItem('state.user'));
  const token = deserializedAuthState?.token;
  const hasShortlinkHeaders = headers?.['x-hasura-shortlink-id'];

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...(token &&
        !hasShortlinkHeaders && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };
});

const httpLink = createHttpLink({
  fetch,
  uri: `/api/v1/graphql`,
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers,
});

// Initial client-side state
cache.writeData({
  data: {
    landing_url: null,
  },
});

export default client;
