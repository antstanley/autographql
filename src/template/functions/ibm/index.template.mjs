import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async params => {
  const { query, variables } = params

  const gqlSDL = `__SDL__ `

  if (!query) {
    const response = {
      statusCode: 400,
      body: JSON.stringify('No query specified')
    }
    return response
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)
    const queryDoc = parse(query)
    if (queryDoc) {
      const context = params.__ow_headers || null
      return execute(gqlSchema, queryDoc, resolvers, context, variables)
    } else {
      return `GraphQL query not valid: ${query}`
    }
  }
}

export { handler }
