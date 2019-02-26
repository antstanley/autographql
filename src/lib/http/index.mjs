import httpServer from './httpServer'
import { logger } from '../utils'
import buildHttp from './build'

const initHttpServer = async options => {
  try {
    const { root, resolvers, schema, dev, external } = options
    const port = dev ? (dev.port ? dev.port : 7000) : 7000
    logger('info', 'dev: starting http server')

    const { resolverLoc, schemaLoc } = buildHttp({
      root,
      schema,
      resolvers,
      external
    })

    if (resolverLoc && schemaLoc) {
      if (httpServer(port, resolverLoc, schemaLoc)) {
        logger('info', `dev: http server starting at http://localhost:${port}`)
      } else {
        logger('warn', 'dev: Unable to start http server')
      }
    } else {
      logger(
        'warn',
        `dev: Unable to bundle schema & resolvers\n schema: ${schemaLoc}\nresolver:${resolverLoc}`
      )
    }
  } catch (error) {
    logger('error', `Unable to init http server with error:\n ${error}`)
  }
}

export default initHttpServer
