import { graphql, buildSchema } from 'graphql'
import resolvers from './resolvers'
import config from './config.json'
import validateOpenId from './validateOpenId'
let gqlSchema

const handler = async (context, req) => {
  try {
    const body = req.body

    const gqlSDL = `__SDL__`

    const gqlContext = {
      req,
      body
    }

    if (config.openid) {
      const authHeader = req.headers['Authorization']
      if (authHeader) {
        const token = authHeader.substr(7)
        gqlContext['jwt'] = await validateOpenId(token, config.openid)
        context.log('Token Validation Failed')
      }
    } else {
      gqlContext['jwt'] = {
        valid: false,
        token: null,
        decoded: null
      }
    }

    if (!body.query) {
      context.res = {
        statusCode: 400,
        body: JSON.stringify('No query specified')
      }
      context.log(`Error: No query specified\n${JSON.stringify(req, null, 2)}`)
    } else {
      if (!gqlSchema) gqlSchema = await buildSchema(gqlSDL)

      const { query, variables } = body

      const response = await graphql(
        gqlSchema,
        query,
        resolvers,
        gqlContext,
        variables,
        null
      )
      context.res = {
        status: 200,
        body: JSON.stringify(response)
      }
    }
    context.done()
  } catch (error) {
    context.done(error)
  }
}

export default handler
