import { graphql, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async (req, res) => {
  const body = req.body

  const gqlSDL = `__SDL__`

  if (!body.query) {
    const response = {
      statusCode: 400,
      body: JSON.stringify('No query specified')
    }
    res.end(response)
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

    const { query, variables } = body

    const response = {
      statusCode: 200,
      body: await graphql(gqlSchema, query, resolvers, null, variables, null)
    }
    res.end(response)
  }
}

export default handler
