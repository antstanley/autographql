import http from 'http'
import { logger } from '../utils'
import gqlFunction from './gqlFunction'
import buildHttp from './build'
import validateOpenId from './validateOpenId'

class devServer {
  constructor (options) {
    const { root, resolvers, schema, openid, dev, external, rollup } = options
    this.root = root
    this.resolvers = resolvers
    this.schema = schema
    this.external = external
    this.rollup = rollup
    this.port = dev ? (dev.port ? dev.port : 7000) : 7000
    this.server = null
    this.openid = openid || false
  }

  async buildFunction () {
    try {
      this.server = null
      const buildResponse = await buildHttp(
        {
          root: this.root,
          schema: this.schema,
          resolvers: this.resolvers,
          external: this.external,
          rollup: this.rollup
        },
        this.port
      )
      return buildResponse
    } catch (error) {
      logger('error', `dev: Unable to build server with error\n${error}`)
      return false
    }
  }

  createServer (serverOpts) {
    if (serverOpts) {
      const { resolverLoc, schemaLoc } = serverOpts
      this.server = http.createServer((req, res) => {
        let reqData = ''
        if (req.method === 'POST') {
          req.on('data', chunk => {
            reqData += chunk
          })
          req.on('error', error => logger('error', `http: ${error}`))
          req.on('end', async () => {
            const queryContext = {
              req,
              body: reqData
            }
            if (this.openid) {
              if (req.headers.authorization) {
                const authHeader = req.headers.authorization
                const token = authHeader.substr(7)
                queryContext['jwt'] = await validateOpenId(token, this.openid)
              } else {
                queryContext['jwt'] = {
                  valid: false,
                  token: null,
                  decoded: null
                }
              }
            }

            const reqJSON = JSON.parse(reqData)
            const operationName = reqJSON.operationName || reqJSON.query
            const response = await gqlFunction(
              reqJSON,
              resolverLoc,
              schemaLoc,
              queryContext
            )
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            })
            res.write(response, 'utf8')
            res.end(() => {
              if (!queryContext.jwt) {
                logger('info', `dev: Response to: ${operationName}`)
              } else {
                if (queryContext.jwt.valid) {
                  logger(
                    'info',
                    `dev: Authenticated response to: ${operationName}`
                  )
                } else {
                  logger(
                    'warn',
                    `dev: Unauthenticated response to: ${operationName}`
                  )
                }
              }
            })
          })
        } else {
          if (req.method === 'OPTIONS') {
            res.writeHead(204, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers':
                'Content-Type, Authorization, x-apollo-tracing',
              'Access-Control-Max-Age': '3600',
              Vary: 'Access-Control-Request-Headers'
            })
            res.end()
          } else {
            res.writeHead(405, { 'Content-Type': 'text/html' })
            res.end('405 - Method not supported')
          }
        }
      })

      return true
    } else {
      return false
    }
  }

  async startServer () {
    try {
      if (this.server) {
        this.server.listen(this.port)
        return true
      } else {
        return false
      }
    } catch (error) {
      logger('error', `dev: Unable to start server with error\n${error}`)
      return false
    }
  }

  async stopServer () {
    let stopResult
    try {
      if (this.server) {
        this.server.close()
        this.server.on('close', () => {
          logger('info', 'dev: http server reloading ...')
        })
      } else {
        logger('warn', 'dev: Server does not exist')
      }

      stopResult = true
    } catch (error) {
      logger('error', `dev: Unable to stop server with error\n${error}`)
      stopResult = false
    } finally {
      return stopResult
    }
  }

  async initServer () {
    if (this.createServer(await this.buildFunction())) {
      return this.startServer()
    } else {
      return false
    }
  }
}

export default devServer
