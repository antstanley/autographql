import { logger } from '../utils'
import config from './config'
import build from '../build'
import http from '../http'
import init from '../init'

const cli = async args => {
  try {
    const validCommands = ['bundle', 'dev', 'deploy', 'init']
    const command = args._[0] || null

    if (command) {
      if (validCommands.includes(command)) {
        if (command === 'init') {
          init()
        } else {
          const configFile =
            args.config || (args.c || 'autographql.config.json')
          const resolvers = args.resolvers || (args.r || false)
          const schema = args.schema || (args.s || false)
          const functions = args.functions || (args.p || false)

          const options = await config(configFile, resolvers, schema, functions)

          switch (command) {
            case 'bundle':
              build(options)
              break
            case 'dev':
              http(options)
              break
            case 'deploy':
              logger('info', 'Deployment not supported at this time')
              break
          }
        }
      } else {
        logger('warn', `command: "${command}" not recognised`)
      }
    } else {
      logger('warn', `No command specified`)
    }
  } catch (error) {
    logger('error', `Error: ${error}`)
  }
}

export default cli
