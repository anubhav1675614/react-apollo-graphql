import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

class ApolloServerClient extends ApolloClient {
  constructor({ token } = {}) {
    const fetch = require('cross-fetch');

    const apiRoute = process.env.HASURA_HOSTNAME || 'http://localhost:8081';

    const cache = new InMemoryCache();

    const authContextHandler = (_, { headers }) => ({
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    });

    const authLink = setContext(authContextHandler);

    const httpLink = createHttpLink({
      credentials: 'same-origin',
      fetch,
      uri: `${apiRoute}/v1/graphql`,
    });

    const link = ApolloLink.from([authLink.concat(httpLink)]);

    const defaultOptions = {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        errorPolicy: 'ignore',
        fetchPolicy: 'no-cache',
      },
    };

    super({
      cache,
      defaultOptions,
      link,
      ssrMode: true,
    });
  }
}

export default ApolloServerClient;
