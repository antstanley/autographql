import loadConfig from './loadConfig'
import validateConfig from './validateConfig'
import { join } from 'path'
import { logger } from '../utils'
import setProjectRoot from './setProjectRoot'

const projectRoot = setProjectRoot()

const configOptions = async configFile => {
  let options = {}
  logger('info', 'Getting config...')
  const configDefaults = {
    name: 'graphql',
    root: './.faasql/',
    schema: './src/schema/schema.gql',
    resolvers: './src/resolvers',
    external: false
  }

  const providerDefaults = [
    { name: 'aws' },
    { name: 'ibm' },
    { name: 'gcp' },
    { name: 'now' }
  ]

  const devDefaults = {
    port: 7000
  }

  const config = configFile ? await loadConfig(configFile) : false

  if (config) {
    for (let setting in configDefaults) {
      if (config.hasOwnProperty(setting)) {
        if (setting === 'root') {
          // this bit is to make sure the root of the .faasql folder where build assets isn't the root of the project... otherwise the build will remove the whole project, which is less than ideal.. not that it ever happened to me, not at all...
          if (config[setting].indexOf('.faasql') === -1) {
            options[setting] = `${config[setting]}/.faasql`
          } else {
            options[setting] = config[setting]
          }
        } else {
          options[setting] = config[setting]
        }
      } else {
        options[setting] = configDefaults[setting]
      }
    }
    if (config.providers) {
      options.providers = config.providers
    } else {
      options.providers = providerDefaults
    }
    if (config.dev) {
      if (config.dev.port) {
        options.dev = config.dev
      } else {
        options.dev = devDefaults
      }
    } else {
      options.dev = devDefaults
    }
  } else {
    logger('info', 'No config file specified, loading defaults...')
    options = configDefaults
    options.providers = providerDefaults
    options.dev = devDefaults
  }

  for (let setting in options) {
    if (setting === 'root' || setting === 'schema' || setting === 'resolvers') {
      options[setting] = join(projectRoot, options[setting])
    }
  }

  return validateConfig(options)
}

export default configOptions
