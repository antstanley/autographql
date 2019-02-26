import loadConfig from '../../../lib/config/loadConfig.mjs'
import test from 'ava'
import { mkdirSync, writeFileSync, unlinkSync, rmdirSync } from 'fs'
import { join } from 'path'

const testConfig = {
  name: 'graphql',
  root: './.autographql',
  schema: './test/sample/schema/starwars.gql',
  resolvers: './test/sample/resolvers/starwars',
  providers: [
    {
      name: 'aws'
    },
    {
      name: 'ibm'
    }
  ],
  dev: {
    port: 7000
  }
}

test.before(t => {
  writeFileSync(
    join(__dirname, '../../../autographql.config.json'),
    JSON.stringify(testConfig)
  )

  mkdirSync(join(__dirname, '../../../testConfig'))
  writeFileSync(
    join(__dirname, '../../../testConfig/autographql.config.json'),
    JSON.stringify(testConfig)
  )
})

test.serial('Load config from JSON in default location', t => {
  const configJSON = loadConfig()
  t.deepEqual(configJSON, testConfig)
  unlinkSync(join(__dirname, '../../../autographql.config.json'))
})

test.serial('Load config from JSON in specified location', t => {
  const configJSON = loadConfig('./testConfig/autographql.config.json')
  t.deepEqual(configJSON, testConfig)
  unlinkSync(join(__dirname, '../../../testConfig/autographql.config.json'))
  rmdirSync(join(__dirname, '../../../testConfig'))
})

test.serial('Load default config when incorrect location specified', t => {
  t.is(loadConfig('./wrongFolder/autographql.config.json'), null)
})

test.serial('Load default config when no config specified', t => {
  t.is(loadConfig(), null)
})

test.serial('Load default config when incorrect file type specified', t => {
  t.is(loadConfig('./autographql.config'), null)
})
