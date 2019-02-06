import config from '../../config'
import validate from './validate'

const buildConfig = async (configFile, resolvers, schema, providers) => {
  if (validate(resolvers, schema, providers)) {
    const options = configFile ? await config(configFile) : await config('')

    if (schema) {
      options.schema = schema
    }

    if (resolvers) {
      options.resolvers = resolvers
    }

    if (providers) {
      options.providers = providers
    }

    return options
  } else {
    return false
  }
}

export default buildConfig
