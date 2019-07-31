function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import http from 'http';
import { logger } from '../utils';
import gqlFunction from './gqlFunction';
import buildHttp from './build'; // import authenticate from '@esmodule/jwt-verify'

class devServer {
  constructor(options) {
    const root = options.root,
          resolvers = options.resolvers,
          schema = options.schema,
          dev = options.dev,
          external = options.external,
          rollup = options.rollup;
    this.root = root;
    this.resolvers = resolvers;
    this.schema = schema;
    this.external = external;
    this.rollup = rollup;
    this.port = dev ? dev.port ? dev.port : 7000 : 7000;
    this.server = null;
  }

  buildFunction() {
    this.server = null;

    const _buildHttp = buildHttp({
      root: this.root,
      schema: this.schema,
      resolvers: this.resolvers,
      external: this.external,
      rollup: this.rollup
    }),
          resolverLoc = _buildHttp.resolverLoc,
          schemaLoc = _buildHttp.schemaLoc;

    return {
      resolverLoc,
      schemaLoc
    };
  }

  createServer(_ref) {
    let resolverLoc = _ref.resolverLoc,
        schemaLoc = _ref.schemaLoc;
    this.server = http.createServer((req, res) => {
      let reqData = '';

      if (req.method === 'POST') {
        req.on('data', chunk => {
          reqData += chunk;
        });
        req.on('error', error => logger('error', "http: " + error));
        req.on('end',
        /*#__PURE__*/
        _asyncToGenerator(function* () {
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
          const reqJSON = JSON.parse(reqData);
          const operationName = reqJSON.operationName || reqJSON.query;
          const response = yield gqlFunction(reqJSON, resolverLoc, schemaLoc);
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          });
          res.write(response, 'utf8');
          res.end(() => {
            logger('info', "Response to: " + operationName);
          });
        }));
      } else {
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-apollo-tracing',
            'Access-Control-Max-Age': '3600',
            Vary: 'Access-Control-Request-Headers'
          });
          res.end();
        } else {
          res.writeHead(405, {
            'Content-Type': 'text/html'
          });
          res.end('405 - Method not supported');
        }
      }
    });
    return true;
  }

  startServer() {
    this.server.listen(this.port);
    return true;
  }

  stopServer() {
    this.server.close();
    return true;
  }

  initServer() {
    if (this.createServer(this.buildFunction())) {
      return this.startServer();
    }
  }

}

export default devServer;