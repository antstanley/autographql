import DevServer from './devServer'
import { logger } from '../utils'
import chokidar from 'chokidar'

const initHttpServer = async options => {
  try {
    const { resolvers, schema } = options
    const newServer = new DevServer(options)

    if (newServer.initServer()) {
      const watcher = chokidar.watch([resolvers, schema])

      watcher.on('ready', () => {
        watcher.on('change', async () => {
          logger('info', `dev: Files changed, rebuilding function`)
          const halt = await newServer.stopServer()
          if (halt) {
            newServer.initServer()
          }
        })
      })
    }
  } catch (error) {
    logger('error', `Unable to init http server with error:\n ${error}`)
  }
}

export default initHttpServer
