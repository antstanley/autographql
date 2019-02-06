import { parse, execute, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async event => {
  const body = event.body

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
    return response
  } else {
    if (!gqlSchema) gqlSchema = buildSchema(gqlSDL)

    const { query, variables } = body

    const queryDoc = parse(query)
    if (queryDoc) {
      const context = event.header || null

      const response = {
        statusCode: 200,
        body: await execute(gqlSchema, queryDoc, resolvers, context, variables)
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
}

export { handler }
