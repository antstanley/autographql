import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async event => {
  const body = event.body

  const gqlSDL = `__SDL__ `

  if (!body.query) {
    const response = {
      statusCode: 400,
      body: JSON.stringify('No query specified')
    }
    return response
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

    const { query, variables } = body

    const queryDoc = parse(query)
    if (queryDoc) {
      const context = event.header || null

      const response = {
        statusCode: 200,
        body: await execute(gqlSchema, queryDoc, resolvers, context, variables)
      }
      return response
    } else {
      const response = {
        statusCode: 400,
        body: `GraphQL query not valid: ${query}`
      }
      return response
    }
  }
}

export { handler }
