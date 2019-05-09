import React from 'react'
import ReactDOM from 'react-dom'
const { Suspense, Fragment, useState } = React
import { ApolloProvider } from 'react-apollo'
import {
  useQuery,
  useSubscription,
  ApolloProvider as ApolloHooksProvider,
} from 'react-apollo-hooks'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { classNames } from './utils'
import environment from './environment'

import './index.css'
// import { schema } from './schema'

const client = new ApolloClient({
  uri: '/graphql',
  clientState: {
    defaults: {
      uiColorPalette: 'light',
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false,
      },
    },
    typeDefs: `
      type NetworkStatus {
        isConnected: Boolean!
      },
      type Query {
        uiColorPalette: String
        networkStatus: NetworkStatus
      },
      type Mutation {
        updateNetworkStatus(isConnected: Boolean!)
      } 
    `,
    resolvers: {
      Query: {
        getNetworkStatus: (_, { isConnected }, { cache }) => {
          return { isConnected: true }
        },
      },
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } })
          return null
        },
      },
    },
  },
})

//cache.writeData({ data: { uiColorPalette: 'dark' } })

const query = gql`
  {
    networkStatus @client {
      isConnected
    }
    uiColorPalette @client
  }
`

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <div id="App">
          <h2>My first Apollo app 🚀</h2>
          <Suspense fallback={<span className="loading">Loading...</span>}>
            <ApolloApp />
          </Suspense>
        </div>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

function ApolloApp() {
  const { data, error } = useQuery(query, { suspend: true, variables: {} })
  console.log({ data, error })
  if (error) {
    return <span className="queryStatus">Error</span>
  } else {
    console.log({ data }, 'ApolloApp')
    return <Fragment>{JSON.stringify(data, null, 2)}</Fragment>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
