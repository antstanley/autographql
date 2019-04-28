import { logger } from '../../utils'
import { readFileSync, writeFileSync } from 'fs'
import mkdirp from 'mkdirp'
import { dirname, join } from 'path'

const initConfig = options => {
  try {
    const { resolvers, schema } = options

    const resolverDir = join(process.cwd(), resolvers)
    mkdirp(resolverDir)

    const fullSchema = join(process.cwd(), schema)
    const schemaDir = dirname(fullSchema)
    mkdirp.sync(schemaDir)
    writeFileSync(fullSchema, '')

    return true
  } catch (error) {
    logger('error', `init project error: ${error}`)
    return false
  }
}

export default initConfig
