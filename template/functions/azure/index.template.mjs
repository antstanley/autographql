import { graphql, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async (context, req) => {
  const body = JSON.parse(req.body)

  const gqlSDL = `__SDL__`

  if (!body.query) {
    context.res = {
      statusCode: 400,
      body: JSON.stringify('No query specified')
    }
    context.log(`Error: No query specified\n${JSON.stringify(req, null, 2)}`)
  } else {
    if (!gqlSchema) gqlSchema = await buildSchema(gqlSDL)

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
    // console.log(response)
    context.res = {
      status: 200,
      body: JSON.stringify(response)
    }
  }
  context.done()
}

export default handler
