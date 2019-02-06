import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async (event, context, callback) => {
  try {
    const body = event.body
    console.log(event)
    const gqlSDL = `__SDL__ `

    const bodyJSON = JSON.parse(body)
    console.log(bodyJSON)
    if (!bodyJSON.query) {
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
      // const bodyJSON = JSON.parse(body)
      // console.log(bodyJSON)
      const { query, variables } = bodyJSON

      const queryDoc = parse(query)
      if (queryDoc) {
        const gqlContext = event.header || null

        const response = {
          statusCode: 200,
          body: await execute(
            gqlSchema,
            queryDoc,
            resolvers,
            gqlContext,
            variables
          )
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
