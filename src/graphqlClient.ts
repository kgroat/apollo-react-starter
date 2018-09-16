
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import authStore from 'state/authStore/authStore'

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL || '/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from the authStore
  const token = authStore.jwt
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export default graphqlClient
