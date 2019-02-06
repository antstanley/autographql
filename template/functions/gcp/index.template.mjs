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
    res.send(response)
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

    const { query, variables } = body

    const authToken = req.get('Authorization')

    const context = authToken ? { authToken } : false

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
