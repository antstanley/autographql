import http from 'http'
import { logger } from '../utils'
import gqlFunction from './gqlFunction'
import buildHttp from './build'
// import authenticate from '@esmodule/jwt-verify'

class devServer {
  constructor (options) {
    const { root, resolvers, schema, dev, external, rollup } = options
    this.root = root
    this.resolvers = resolvers
    this.schema = schema
    this.external = external
    this.rollup = rollup
    this.port = dev ? (dev.port ? dev.port : 7000) : 7000
    this.server = null
  }

  buildFunction () {
    this.server = null
    const { resolverLoc, schemaLoc } = buildHttp({
      root: this.root,
      schema: this.schema,
      resolvers: this.resolvers,
      external: this.external,
      rollup: this.rollup
    })

    return { resolverLoc, schemaLoc }
  }

  createServer ({ resolverLoc, schemaLoc }) {
    this.server = http.createServer((req, res) => {
      let reqData = ''
      if (req.method === 'POST') {
        req.on('data', chunk => {
          reqData += chunk
        })
        req.on('error', error => logger('error', `http: ${error}`))
        req.on('end', async () => {
          /*
          if (req.headers.authorization) {
            console.time('auth')
            const authHeader = req.headers.authorization
            const token = authHeader.substr(7)
            const authResponse = await authenticate(token)
            logger(
              'info',
              `authResponse: ${JSON.stringify(authResponse, null, 2)}`
            )
            console.timeEnd('auth')
          }
          */
          const reqJSON = JSON.parse(reqData)
          const operationName = reqJSON.operationName || reqJSON.query
          const response = await gqlFunction(reqJSON, resolverLoc, schemaLoc)
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          })
          res.write(response, 'utf8')
          res.end(() => {
            logger('info', `Response to: ${operationName}`)
          })
        })
      } else {
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
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
  }

  startServer () {
    this.server.listen(this.port)
    return true
  }

  stopServer () {
    this.server.close()
    return true
  }

  initServer () {
    if (this.createServer(this.buildFunction())) {
      return this.startServer()
    }
  }
}

export default devServer
