import copyResolvers from './copyResolvers'
import prepareDeploy from './prepareDeploy'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { logger } from '../../../utils'
import setTemplateLocation from './setTemplateLocation'

const createFunction = ({
  root,
  schema,
  resolvers,
  functionName,
  functionConfig,
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

      // check if you need to create an Azure function app
      if (provider !== 'azure') {
        const templateLocation = setTemplateLocation(
          `../../../../template/functions/${provider}/index.template.mjs`
        )

        const schemaFile = readFileSync(schema, 'utf-8')
        const functionTemplate = readFileSync(templateLocation, 'utf-8')

        const providerFunction = functionTemplate.replace(
          /__SDL__/g,
          schemaFile
        )

        if (!providerFunction) {
          throw new Error('Unable to inject schema into function')
        }
        logger('info', `${provider} - ${name}: Writing function`)
        writeFileSync(`${functionLocation}/index.mjs`, providerFunction)
        prepareDeploy({ name, functionName, functionLocation })

        return {
          name,
          provider,
          distName: `${root}/dist/functions/${provider}`,
          input: `${functionLocation}/index.mjs`,
          output: `${root}/dist/functions/${provider}/${name}/`,
          functionConfig,
          external
        }
      }
    }
  } catch (error) {
    logger('error', `Unable to create function with Error: ${error}`)
    return null
  }
}

export default createFunction
