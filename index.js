import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import ReactDOM from 'react-dom'
const { Suspense, Fragment, useState } = React
import { ApolloProvider, Subscription } from 'react-apollo'
import {
  useQuery,
  useSubscription,
  ApolloProvider as ApolloHooksProvider,
} from 'react-apollo-hooks'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { setContext } from 'apollo-link-context'
import './index.css'
import { classNames } from './utils'
import environment from './environment'

const client = new ApolloClient({
  cache: new InMemoryCache(),
})

const query = gql`
  {
    getAppInfo(
    ) {
      name
    }
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
