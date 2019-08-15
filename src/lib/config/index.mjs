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
    root: './.autographql/',
    schema: './src/schema/schema.gql',
    resolvers: './src/resolvers',
    openid: false,
    external: false,
    rollup: {
      resolve: {
        module: false,
        main: true,
        extensions: ['.mjs', '.js', '.json'],
        preferBuiltins: true
      },
      json: {
        preferConst: true
      },
      commonjs: {},
      babel: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '8'
              }
            }
          ]
        ],
        plugins: ['@babel/plugin-syntax-import-meta']
      },
      warnings: ['CIRCULAR_DEPENDENCY']
    }
  }

  const providerDefaults = [
    { provider: 'aws' },
    { provider: 'ibm' },
    { provider: 'gcp' },
    { provider: 'now' }
  ]

  const devDefaults = {
    port: 7000
  }

  const config = configFile ? await loadConfig(configFile) : false

  if (config) {
    for (const setting in configDefaults) {
      if (typeof config[setting] !== 'undefined') {
        if (setting === 'root') {
          // this bit is to make sure the root of the .autographql folder where build assets isn't the root of the project... otherwise the build will remove the whole project, which is less than ideal.. not that it ever happened to me, not at all...
          if (config[setting].indexOf('.autographql') === -1) {
            options[setting] = `${config[setting]}/.autographql`
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
    if (config.functions) {
      options.functions = config.functions
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
    options.functions = providerDefaults
    options.dev = devDefaults
  }

  for (const setting in options) {
    if (setting === 'root' || setting === 'schema' || setting === 'resolvers') {
      options[setting] = join(projectRoot, options[setting])
    }
  }

  return validateConfig(options)
}

export default configOptions
