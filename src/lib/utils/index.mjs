import removeFolder from './removeFolder'
import copyFolderRecursiveSync from './copyFolderRecursiveSync'
import logger from './logger'
import rollupDefault from './rollupDefault'
// import { dirname, join } from 'path'

// const moduleRoot = join(dirname(new URL(import.meta.url).pathname), '../../')

/*
const projectRoot = join(
  dirname(new URL(import.meta.url).pathname),
  '../../../../../'
)
*/

// const projectRoot = join(dirname(new URL(import.meta.url).pathname), '../../')

export { removeFolder, copyFolderRecursiveSync, logger, rollupDefault }
