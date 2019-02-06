import bundleGraphQL from '../../src/lib/build/bundle/index.mjs'

const options = {
  root: './faasql',
  server: './faasql/server',
  dist: './faasql/dist',
  schema: './test/sample/schema/starwars.gql',
  resolvers: './test/sample/resolvers'
}

bundleGraphQL(options)
