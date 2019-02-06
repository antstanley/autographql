import bundleProject from './bundleProject'
import copyFunc from './copyFunc'
import copyExternal from './copyExternal'

const bundleGraphQL = async functionManifest => {
  try {
    const manifest = functionManifest
    const arrLength = manifest.length

    for (let i = 0; i < arrLength; i++) {
      const options = manifest[i]
      const bundleSuccess = await bundleProject(options)
      if (bundleSuccess) {
        if (options.provider) {
          const { input, output, provider, external } = options
          if (provider.dist) {
            await copyFunc({ provider, output })
          }
          if (external) {
            await copyExternal({ provider, external, input, output })
          }
        }
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default bundleGraphQL
