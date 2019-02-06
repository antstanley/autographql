import { graphql, buildSchema } from 'graphql'
import resolvers from './resolvers'
let gqlSchema

const handler = async (req, res) => {
  const body = req.body

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
}`

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
