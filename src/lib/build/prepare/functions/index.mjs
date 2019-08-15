import copyResolvers from './copyResolvers'
import copyLibraries from './copyLibraries'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { logger } from '../../../utils'
import setTemplateLocation from './setTemplateLocation'

const createFunction = ({
  root,
  schema,
  resolvers,
  functionName,
  functionConfig,
  openid,
  external
}) => {
  try {
    const { provider } = functionConfig
    const name = functionConfig.name ? functionConfig.name : functionName

    const buildDestination = `${root}/build/functions/${provider}`
    const functionLocation = `${buildDestination}/${name}`
    const resolverLocation = `${functionLocation}/resolvers`

    // create function and resolvers folder
    mkdirSync(buildDestination)
    mkdirSync(functionLocation)
    mkdirSync(resolverLocation)
    logger('info', `${provider} - ${name}: Exporting resolvers`)
    // copy resolvers to resolver folder
    if (copyResolvers(resolverLocation, resolvers)) {
      // create function index.js and copy it

      const templateLocation = setTemplateLocation(
        `../../../../template/functions/${provider}/index.template.mjs`
      )

      const schemaFile = readFileSync(schema, 'utf-8')
      const functionTemplate = readFileSync(templateLocation, 'utf-8')

      const providerFunction = functionTemplate.replace(/__SDL__/g, schemaFile)

      if (!providerFunction) {
        throw new Error('Unable to inject schema into function')
      }
      logger('info', `${provider} - ${name}: Writing function`)

      // write function to build directory
      writeFileSync(`${functionLocation}/index.mjs`, providerFunction)

      // write function configuration options
      const config = {
        openid
      }
      writeFileSync(
        join(functionLocation, 'config.json'),
        JSON.stringify(config)
      )

      // copy default libraries needed by autographql
      const libArray = ['../../../utils/validateOpenId.mjs']
      const copyLibResult = copyLibraries(libArray, functionLocation)
      if (copyLibResult) {
        return {
          name,
          provider,
          distName: `${root}/dist/functions/${provider}`,
          input: `${functionLocation}/index.mjs`,
          output: `${root}/dist/functions/${provider}/${name}/`,
          functionConfig,
          openid,
          external
        }
      } else {
        return null
      }
    }
  } catch (error) {
    logger(
      'error',
      `createFunction: Unable to create function with Error: ${error}`
    )
    return null
  }
}

export default createFunction
