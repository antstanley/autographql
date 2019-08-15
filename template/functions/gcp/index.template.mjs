import { graphql, buildSchema } from 'graphql'
import resolvers from './resolvers'
import config from './config.json'
import validateOpenId from './validateOpenId'
let gqlSchema

const handler = async (req, res) => {
  const body = req.body

  const gqlSDL = `__SDL__`

  const context = {
    req,
    body
  }

  if (config.openid) {
    const authHeader = req.get('Authorization')
    if (authHeader) {
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
    res.send(response)
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

    const { query, variables } = body

    const response = await graphql(
      gqlSchema,
      query,
      resolvers,
      context,
      variables,
      null
    )
    console.log(response)
    res.status(200).json(response)
  }
}

export { handler }
