import bundleProject from './bundleProject'
import copyFunc from './copyFunc'
import copyAzureFunc from './copyAzureFunc'
import copyExternal from './copyExternal'
import { logger } from '../../utils'
import zipFunction from './zipFunction'

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
          let bundledFunction = false
          if (functionConfig.dist) {
            if (functionConfig.provider === 'azure') {
              bundledFunction = await copyAzureFunc({
                functionConfig,
                output,
                provider,
                name
              })
            } else {
              bundledFunction = await copyFunc({
                functionConfig,
                output,
                provider,
                name
              })
            }
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
          const zipFunc = functionConfig.zip ? functionConfig.zip : false
          if (bundledFunction && zipFunc) {
            await zipFunction(functionConfig.dist, name, provider)
          }
        }
      }
    }
  } catch (error) {
    logger('error', error)
  }
}

export default bundleGraphQL
