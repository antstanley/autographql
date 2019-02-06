import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async (event, context, callback) => {
  try {
    const body = event.body
    console.log(event)
    const gqlSDL = `type Query {
  human(id: ID!): Human
  allHumans: [Human]
  droid(id: ID!): Droid
  allDroids: [Droid]
}

interface Character {
  id: ID!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  secretBackstory: String
}

enum Episode {
  PHANTOM
  CLONES
  SITH
  NEWHOPE
  EMPIRE
  JEDI
  FORCE
  LASTJEDI
}

type Droid implements Character {
  id: ID!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  secretBackstory: String
  primaryFunction: String
}

type Human implements Character {
  id: ID!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
  secretBackstory: String
} `

    if (!body.query) {
      const response = {
        statusCode: 400,
        body: JSON.stringify('No query specified')
      }
      callback(null, response)
    } else {
      if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

      const { query, variables } = JSON.parse(body)

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
