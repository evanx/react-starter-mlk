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
import './index.css'
import { classNames } from './utils'
import environment from './environment'
// import { schema } from './schema'

const client = new ApolloClient({
  uri: '/graphql',
  clientState: {
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } })
          return null
        },
      },
    },
  },
})

const query = `
  networkStatus @client {
    isConnected
  }  
`

const start = () =>
  client
    .query({
      query,
    })
    .then(result => console.log(result))

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
