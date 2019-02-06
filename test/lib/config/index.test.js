import config from '../../../lib/config/index.mjs'
import test from 'ava'
import { join } from 'path'
import { writeFileSync, unlinkSync, mkdirSync, rmdirSync } from 'fs'

const configLocation = './test/sample/autographql.config.json'
const configPartialLocation = './test/sample/faasql.config.partial.json'

test('Validate root folder location is valid', async t => {
  const { root } = await config(configLocation)
  const expectedLoc = join(__dirname, '../../../../.autographql')
  t.is(root, expectedLoc)
})

test('Partial config load', async t => {
  mkdirSync(join(__dirname, '../../../../src'))
  mkdirSync(join(__dirname, '../../../../src/resolvers'))
  mkdirSync(join(__dirname, '../../../../src/schema'))
  writeFileSync(
    join(__dirname, '../../../../src/schema/schema.gql'),
    'test data - ignore'
  )

  const defaultJSON = {
    name: 'graphql',
    root: './.faasql/',
    schema: './src/schema/schema.gql',
    resolvers: './src/resolvers'
  }

  t.plan(4)
  const partialJSON = await config(configPartialLocation)

  const elementArray = ['name', 'root', 'schema', 'resolvers']
  for (let i = 0; i < 4; i++) {
    if (elementArray[i] === 'name') {
      t.true(
        partialJSON[elementArray[i]] === defaultJSON[elementArray[i]],
        `key: ${elementArray[i]}\nReturned: ${
          partialJSON[elementArray[i]]
        }\nExpected: ${defaultJSON[elementArray[i]]}`
      )
    } else {
      t.true(
        partialJSON[elementArray[i]] ===
          join(__dirname, '../../../../', defaultJSON[elementArray[i]]),
        `key:${elementArray[i]}\nReturned: ${
          partialJSON[elementArray[i]]
        }\nExpected: ${join(
          __dirname,
          '../../../',
          defaultJSON[elementArray[i]]
        )}`
      )
    }
  }

  /*
  const partialJSON = await config(configPartialLocation)

  const elementArray = ['name', 'root', 'schema', 'resolvers']
  for (let i = 0; i < 4; i++) {
    delete partialJSON[elementArray[i]]
    writeFileSync('../../../faasql.config.json', JSON.stringify(partialJSON))
    const testJSON = await config('./faasql.config.json')
    if (elementArray[i] === 'name') {
      t.true(
        testJSON[elementArray[i]] === defaultJSON[elementArray[i]],
        `${elementArray[i]}\n${testJSON[elementArray[i]]}\n${
          defaultJSON[elementArray[i]]
        }`
      )
    } else {
      t.true(
        testJSON[elementArray[i]] ===
          join(__dirname, '../../../', defaultJSON[elementArray[i]]),
        `${elementArray[i]}\n${testJSON[elementArray[i]]}\n${join(
          __dirname,
          '../../../',
          defaultJSON[elementArray[i]]
        )}`
      )
    }
    unlinkSync('../../../faasql.config.json')
  }
  */
  unlinkSync(join(__dirname, '../../../src/schema/schema.gql'))
  rmdirSync(join(__dirname, '../../../src/schema'))
  rmdirSync(join(__dirname, '../../../src/resolvers'))
  // rmdirSync(join(__dirname, '../../../src'))
})

test('Provider options included', t => {})

test('Default provider options included', t => {})

test('Dev server options included', t => {})

test('Default Dev server options included', t => {})

test('Path correctly joined for root directory', t => {})

test('Path correctly joined for schema directory', t => {})

test('Path correctly joined for resolver directory', t => {})
