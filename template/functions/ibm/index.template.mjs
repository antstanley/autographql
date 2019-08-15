import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
import config from './config.json'
import validateOpenId from './validateOpenId'
let gqlSchema

const handler = async params => {
  const { query, variables, headers } = params

  const gqlSDL = `__SDL__ `

  const context = {
    req: params,
    body: params
  }

  if (config.openid) {
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
