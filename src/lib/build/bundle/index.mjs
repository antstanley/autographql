import bundleProject from './bundleProject'
import copyFunc from './copyFunc'
import copyExternal from './copyExternal'
import { logger } from '../../utils'

const bundleGraphQL = async (functionManifest, rollupConfig) => {
  try {
    const manifest = functionManifest
    const arrLength = manifest.length

    for (let i = 0; i < arrLength; i++) {
      const options = manifest[i]
      const bundleSuccess = await bundleProject(options, rollupConfig)
      if (bundleSuccess) {
        if (options.functionConfig) {
          const {
            input,
            output,
            functionConfig,
            external,
            provider,
            name
          } = options
          if (functionConfig.dist) {
            await copyFunc({ functionConfig, output, provider, name })
          }
          if (external) {
            await copyExternal({
              provider,
              name,
              external,
              input,
              output,
              functionConfig
            })
          }
        }
      }
    }
  } catch (error) {
    logger('error', error)
  }
}

export default bundleGraphQL
