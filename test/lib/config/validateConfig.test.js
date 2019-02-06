import validateConfig from '../../../lib/config/validateConfig.mjs'
import test from 'ava'

const validConfig = {
  name: 'graphql',
  root: './.autographql/',
  schema: './test/sample/schema/starwars.gql',
  resolvers: './test/sample/resolvers'
}

const badConfigSchema = {
  name: 'graphql',
  resolvers: './test/sample/resolvers'
}

const badConfigResolvers = {
  name: 'graphql',
  schema: './test/sample/schema/starwars.gql'
}

const badConfigName = {
  schema: './test/sample/schema/starwars.gql',
  resolvers: './test/sample/resolvers'
}

test('Valid config passing', t => {
  if (validateConfig(validConfig) === validConfig) t.pass()
})

test('Bad config failing on Name', t => {
  try {
    validateConfig(badConfigName)
  } catch (error) {
    if (error === 'Function name not specified') t.pass()
  }
})

test('Bad config failing on Schema', t => {
  try {
    validateConfig(badConfigSchema)
  } catch (error) {
    if (error.message.includes('Schema file does not exist at location:')) {
      t.pass()
    }
  }
})

test('Bad config failing on Resolvers', t => {
  try {
    validateConfig(badConfigResolvers)
  } catch (error) {
    if (error.message.includes('Resolvers do not exist at location:')) t.pass()
  }
})

/*
`Schema file does not exist at location: ${config.schema}`)
  }

  if (!existsSync(config.resolvers)) {
    throw new Error(`Resolvers do not exist at location: ${config.resolvers}`)
  }

  if (!config.name) {
    throw new Error(`Function name not specified`)
*/
