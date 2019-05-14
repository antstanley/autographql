import { logger } from '../utils'
import { writeFileSync, existsSync } from 'fs'
import mkdirp from 'mkdirp'
import { dirname, join } from 'path'

const initConfig = async ({ options, configFile }) => {
  try {
    const { resolvers, schema } = options

    const resolverDir = join(process.cwd(), resolvers)
    if (!existsSync(resolverDir)) {
      mkdirp(resolverDir)
      writeFileSync(join(resolverDir, 'index.js'), '')
      logger('info', `init: Resolver directory created`)
    }

    const fullSchema = join(process.cwd(), schema)
    const schemaDir = dirname(fullSchema)
    if (!existsSync(schemaDir)) {
      mkdirp.sync(schemaDir)
      logger('info', `init: Schema directory created`)
    }
    if (!existsSync(fullSchema)) {
      writeFileSync(fullSchema, '')
    }
    const fullConfig = join(process.cwd(), configFile)
    if (!existsSync(fullConfig)) {
      writeFileSync(fullConfig, JSON.stringify(options))
    } else {
      logger('error', `${fullConfig} already exists.`)
    }

    logger('info', `Project config and scaffolding created.`)
    return true
  } catch (error) {
    logger('error', `init project error: ${error}`)
    return false
  }
}

export default initConfig
