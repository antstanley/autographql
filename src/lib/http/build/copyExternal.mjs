import { copyFolderRecursiveSync, logger } from '../../utils'
import { dirname, join } from 'path'
import { existsSync, lstatSync, copyFileSync } from 'fs'

const copyFilesFolders = async (input, output, external) => {
  const inputDir = lstatSync(input).isFile() ? dirname(input) : input
  const source = join(inputDir, external)
  if (existsSync(source)) {
    if (lstatSync(source).isDirectory()) {
      copyFolderRecursiveSync(source, join(output, external))
    } else {
      copyFileSync(source, join(output, external))
    }
  } else {
    logger('warn', `Unable to copy external data. '${source}' does not exist`)
  }
}

const copyExternal = async ({ external, input, output }) => {
  try {
    logger('info', `dev: Copying external data`)
    if (Array.isArray(external)) {
      const arrLength = external.length
      for (let i = 0; i < arrLength; i++) {
        await copyFilesFolders(input, output, external[i])
      }
      return true
    } else {
      await copyFilesFolders(input, output, external)
    }
  } catch (error) {
    logger('warn', `Unable to copy external data with error:\n${error}`)
  }
}

export default copyExternal
