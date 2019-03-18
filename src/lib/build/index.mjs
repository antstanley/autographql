import validate from './validate'
import prepare from './prepare'
import bundle from './bundle'
import { logger } from '../utils'

const build = async options => {
  try {
    await validate(options.schema)

    const functionManifest = await prepare(options)

    if (!functionManifest) {
      logger('error', 'Unable to prepare project root')
      // throw new Error('Unable to prepare project root')
    } else {
      const { rollup } = options
      return bundle(functionManifest, rollup)
    }
  } catch (error) {
    logger('error', `Bundle process failed: ${error}\n${error.stack}`)
  }
}

export default build
