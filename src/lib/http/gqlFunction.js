const { graphql, buildSchema } = require('graphql')
const fs = require('fs')
const { logger } = require('../utils')

const handler = async (params, resolvers, schema, context) => {
  try {
    const { query, variables } = params

    if (!query) {
      const response = 'No query specified'
      logger('warn', `dev: ${response}`)
      return response
    } else {
      const gqlSchema = await buildSchema(fs.readFileSync(schema, 'utf-8'))
      const resolverModule = require(resolvers)
      const response = await graphql(
        gqlSchema,
        query,
        resolverModule,
        context,
        variables
      )
      if (response.errors) {
        logger(
          'warn',
          `query error response:\n${JSON.stringify(response, null, 2)}`
        )
      }
      return JSON.stringify(response)
    }
  } catch (error) {
    logger('error', `Unable to process GraphQL Query with error:\n${error}`)
    return {
      error
    }
  }
}

export default handler
