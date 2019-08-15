import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
import config from './config.json'
import validateOpenId from './validateOpenId'
let gqlSchema

const handler = async event => {
  try {
    const body = JSON.parse(event.body)
    const context = {
      req: event,
      body
    }

    if (config.openid) {
      const { headers } = event
      if (headers['Authorization']) {
        const authHeader = headers['Authorization']
        const token = authHeader.substr(7)
        context['jwt'] = await validateOpenId(token, config.openid)
        console.log('Token Validation Failed')
      }
    } else {
      context['jwt'] = {
        valid: false,
        token: null,
        decoded: null
      }
    }

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
        // const context = event.header || null

        const responseBody = JSON.stringify(
          await execute(gqlSchema, queryDoc, resolvers, context, variables)
        )

        const response = {
          statusCode: 200,
          body: responseBody
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
  } catch (error) {
    console.log(error)
    const response = {
      statusCode: 400,
      body: `A server side error has occurred`
    }
    return response
  }
}

export { handler }
