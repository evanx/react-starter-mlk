const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools')

const typeDefs = `
  type Query {
    getAppInfo: AppInfo
  }
  type AppInfo {
    name: String!
  }
`

const schema = makeExecutableSchema({ typeDefs })

const mocks = {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
}

addMockFunctionsToSchema({ schema, mocks })

module.exports = schema
