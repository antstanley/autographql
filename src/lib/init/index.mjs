import prompt from './prompt'
import prepare from './prepare'
import { logger } from '../utils'

const initProject = async () => {
  try {
    const prepareOpts = await prompt()
    if (prepareOpts) {
      await prepare(prepareOpts)
    } else {
      logger('warn', 'Config file not created')
    }
  } catch (error) {
    logger('error', `Unable to initialise project with error: ${error}`)
  }
}

export default initProject
