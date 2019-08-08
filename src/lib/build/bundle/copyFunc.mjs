import { copyFileSync, lstatSync, existsSync } from 'fs'
import { join } from 'path'
import { logger } from '../../utils'
import setDistDir from './setDestDir'
import mkdirp from 'mkdirp'

const copyFunc = async ({ output, functionConfig, provider, name }) => {
  try {
    logger(
      'info',
      `${provider} - ${name}: Copying function to distribution folder '${
        functionConfig.dist
      }'`
    )
    const { dist } = functionConfig
    const fileDestDir = setDistDir(dist)
    const fileDest = join(fileDestDir, 'index.js')
    const fileSrc = join(output, 'index.js')

    if (existsSync(fileDestDir)) {
      if (lstatSync(fileDestDir).isDirectory()) {
        copyFileSync(fileSrc, fileDest)
        return true
      } else {
        logger(
          'warn',
          `Provider distribution location '${fileDestDir}' is not a directory`
        )
        return false
      }
    } else {
      mkdirp.sync(fileDestDir)
      copyFileSync(fileSrc, fileDest)
      return true
    }
  } catch (error) {
    logger(
      'warn',
      `${provider} - ${name}: Unable to copy function to location with error: ${error}`
    )
    return false
  }
}

export default copyFunc
