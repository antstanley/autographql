import { copyFolderRecursiveSync, logger } from '../../utils'
import { dirname, join } from 'path'
import { existsSync, lstatSync, copyFileSync } from 'fs'
import setDestDir from './setDestDir'

const copyFilesFolders = async (inputDir, output, external, dist) => {
  const source = join(inputDir, external)
  if (existsSync(source)) {
    if (lstatSync(source).isDirectory()) {
      copyFolderRecursiveSync(source, join(output, external))
      if (dist) {
        const fullDist = setDestDir(dist)
        if (existsSync(fullDist)) {
          copyFolderRecursiveSync(source, join(fullDist, external))
        } else {
          logger(
            'warn',
            `Unable to copy external data to '${dist}' as it does not exist`
          )
        }
      }
    } else {
      copyFileSync(source, join(output, external))
      if (dist) {
        const fullDist = setDestDir(dist)
        if (existsSync(fullDist)) {
          copyFileSync(source, join(fullDist, external))
        } else {
          logger(
            'warn',
            `Unable to copy external data to '${dist}' as it does not exist`
          )
        }
      }
    }
  } else {
    logger('warn', `Unable to copy external data. '${source}' does not exist`)
  }
}

const copyExternal = async ({
  provider,
  name,
  functionConfig,
  external,
  input,
  output
}) => {
  try {
    logger('info', `${provider} - ${name}: Copying external data`)

    const inputDir = join(dirname(input), 'resolvers')
    const dist = functionConfig.dist ? functionConfig.dist : false

    if (Array.isArray(external)) {
      const arrLength = external.length
      for (let i = 0; i < arrLength; i++) {
        await copyFilesFolders(inputDir, output, external[i], dist)
      }
      return true
    } else {
      await copyFilesFolders(inputDir, output, external, dist)
    }
  } catch (error) {
    logger('warn', `Unable to copy external data with error:\n${error}`)
  }
}

export default copyExternal
