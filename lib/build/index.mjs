import validate from './validate'
import prepare from './prepare'
import bundle from './bundle'
import { logger } from '../utils'

const build = async options => {
  try {
    await validate(options.schema)
    /*
    if (!validateErrors) {
      throw new Error(
        `Unable to parse GraphQL schema with errors.\n${validateErrors}`
      )
    }
    */

    const functionManifest = await prepare(options)

    if (!functionManifest) {
      logger('error', 'Unable to prepare project root') // throw new Error('Unable to prepare project root')
    } else {
      return bundle(functionManifest)
    }
  } catch (error) {
    logger('error', `Bundle process failed:\n${error}`)
  }
}

export default build
