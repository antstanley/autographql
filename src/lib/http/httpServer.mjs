import http from 'http'
import { logger } from '../utils'
import gqlFunction from './gqlFunction'

const httpServer = (port, resolvers, schema) => {
  const server = http.createServer((req, res) => {
    let reqData = ''
    if (req.method === 'POST') {
      req.on('data', chunk => {
        reqData += chunk
      })
      req.on('error', error => logger('error', `http: ${error}`))
      req.on('end', async () => {
        const reqJSON = JSON.parse(reqData)
        const operationName = reqJSON.operationName || reqJSON.query
        const response = await gqlFunction(reqJSON, resolvers, schema)
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        })
        res.write(response, 'utf8')
        res.end(() => {
          logger('info', `Response to:\n ${operationName}`)
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

  server.listen({ port })
  logger('info', `dev: Server started at http://localhost:${port}`)
  return true
}

export default httpServer
