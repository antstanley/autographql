import { graphql, buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import { logger } from '../utils'
// import resolverFunc from '../../test/sample/resolvers'

const handler = async (params, resolvers, schema, context) => {
  try {
    const { query, variables } = params

    if (!query) {
      const response = 'No query specified'
      logger('warn', `dev: ${response}`)
      return response
    } else {
      logger('warn', `resolvers: ${resolvers}\nschema:${schema}`)
      // logger('warn', `query: ${query}\nvariables:${variables}`)
      const gqlSchema = await buildSchema(readFileSync(schema, 'utf-8'))

      const importedModule = await import(resolvers)

      const resolverModule = importedModule.default

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
