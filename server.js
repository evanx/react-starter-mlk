const assert = require('assert')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const gql = require('graphql-tag')

const app = express()

const schema = gql`
  type Query {
    appInfo: AppInfo
  }

  type AppInfo {
    name: String!
  }
`

const resolvers = {
  Query: {
    appInfo: () => {
      return {
        name: 'my app',
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql')
})
