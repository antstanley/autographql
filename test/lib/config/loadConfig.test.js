import loadConfig from '../../../lib/config/loadConfig.mjs'
import test from 'ava'
import { mkdirSync, writeFileSync, unlinkSync, rmdirSync } from 'fs'
import { join } from 'path'
import YAML from 'yaml'

const testConfig = {
  name: 'graphql',
  root: './.faasql',
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
    join(__dirname, '../../../faasql.config.json'),
    JSON.stringify(testConfig)
  )
  writeFileSync(
    join(__dirname, '../../../faasql.config.yml'),
    YAML.stringify(testConfig)
  )

  mkdirSync(join(__dirname, '../../../testConfig'))
  writeFileSync(
    join(__dirname, '../../../testConfig/faasql.config.json'),
    JSON.stringify(testConfig)
  )
  writeFileSync(
    join(__dirname, '../../../testConfig/faasql.config.yml'),
    YAML.stringify(testConfig)
  )
})

test.serial('Load config from JSON in default location', t => {
  const configJSON = loadConfig()
  t.deepEqual(configJSON, testConfig)
  unlinkSync(join(__dirname, '../../../faasql.config.json'))
})

test.serial('Load config from YAML in default location', t => {
  const configYML = loadConfig()
  t.deepEqual(configYML, testConfig)
  unlinkSync(join(__dirname, '../../../faasql.config.yml'))
})

test.serial('Load config from JSON in specified location', t => {
  const configJSON = loadConfig('./testConfig/faasql.config.json')
  t.deepEqual(configJSON, testConfig)
  unlinkSync(join(__dirname, '../../../testConfig/faasql.config.json'))
})

test.serial('Load config from YAML in specified location', t => {
  const configYML = loadConfig('./testConfig/faasql.config.yml')
  t.deepEqual(configYML, testConfig)
  unlinkSync(join(__dirname, '../../../testConfig/faasql.config.yml'))
  rmdirSync(join(__dirname, '../../../testConfig'))
})

test.serial('Load default config when incorrect location specified', t => {
  t.is(loadConfig('./wrongFolder/faasql.config.json'), null)
})

test.serial('Load default config when no config specified', t => {
  t.is(loadConfig(), null)
})

test.serial('Load default config when incorrect file type specified', t => {
  t.is(loadConfig('./faasql.config'), null)
})
