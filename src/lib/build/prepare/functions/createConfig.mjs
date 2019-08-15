import { logger } from '../../../utils'
import { writeFileSync } from 'fs'
import { join } from 'path'

const createConfig = async (config, functionLocation) => {
  try {
    writeFileSync(join(functionLocation, 'config.json'), JSON.stringify(config))
  } catch (error) {
    logger(
      'error',
      `createConfig: Unable to create config.json with error.\n${
        error.message
      }\n${error.stack}`
    )
  }
}

export default createConfig
