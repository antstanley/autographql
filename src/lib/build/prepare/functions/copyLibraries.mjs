import { logger, copyFolderRecursiveSync } from '../../../utils'
import { lstatSync, copyFileSync } from 'fs'
import { basename, join } from 'path'

import setTemplateLocation from './setTemplateLocation'

const copyLibraries = async (libArray, functionLocation) => {
  let result
  try {
    for (let i = 0; i < libArray.length; i++) {
      const libLocation = setTemplateLocation(libArray[i])
      const libStat = lstatSync(libLocation)
      if (libStat.isFile()) {
        copyFileSync(libLocation, join(functionLocation, basename(libLocation)))
      } else {
        if (libStat.isDirectory()) {
          copyFolderRecursiveSync(libLocation, functionLocation)
        } else {
          logger(
            'warn',
            `copyLibraries: ${
              libArray[i]
            } is not a valid file or directory location`
          )
        }
      }
    }
    result = true
  } catch (error) {
    logger(
      'error',
      `copyLibraries: Copying libraries failed.\nError:${error.message}\n${
        error.stack
      }`
    )
    result = false
  }
  return result
}

export default copyLibraries
