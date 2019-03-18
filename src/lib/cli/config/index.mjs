import config from '../../config'
import validate from './validate'

const buildConfig = async (configFile, resolvers, schema, functions) => {
  if (validate(resolvers, schema, functions)) {
    const options = configFile ? await config(configFile) : await config('')

    if (schema) {
      options.schema = schema
    }

    if (resolvers) {
      options.resolvers = resolvers
    }

    if (functions) {
      options.providers = functions
    }

    return options
  } else {
    return false
  }
}

export default buildConfig
