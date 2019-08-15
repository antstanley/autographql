import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
import config from './config.json'
import validateOpenId from './validateOpenId'
let gqlSchema

const handler = async (event, _, callback) => {
  try {
    const gqlSDL = `__SDL__ `

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

    if (!body.query) {
      const response = {
        statusCode: 400,
        body: JSON.stringify('No query specified')
      }
      callback(null, response)
    } else {
      if (!gqlSchema) {
        console.log('Init Schema')
        gqlSchema = buildSchema(gqlSDL)
      }

      const { query, variables } = body

      const queryDoc = parse(query)
      if (queryDoc) {
        const gqlResponse = await execute(
          gqlSchema,
          queryDoc,
          resolvers,
          context,
          variables
        )
        const response = {
          statusCode: 200,
          body: JSON.stringify(gqlResponse)
        }
        callback(null, response)
      } else {
        const response = {
          statusCode: 400,
          body: `GraphQL query not valid: ${query}`
        }
        callback(null, response)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export { handler }
