"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _utils = require("../utils");

var _gqlFunction = _interopRequireDefault(require("./gqlFunction"));

var _build = _interopRequireDefault(require("./build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import authenticate from '@esmodule/jwt-verify'
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

  async buildFunction() {
    try {
      this.server = null;
      const buildResponse = await (0, _build.default)({
        root: this.root,
        schema: this.schema,
        resolvers: this.resolvers,
        external: this.external,
        rollup: this.rollup
      });
      return buildResponse;
    } catch (error) {
      (0, _utils.logger)('error', `dev: Unable to build server with error\n${error}`);
      return false;
    }
  }

  createServer(serverOpts) {
    if (serverOpts) {
      const resolverLoc = serverOpts.resolverLoc,
            schemaLoc = serverOpts.schemaLoc;
      this.server = _http.default.createServer((req, res) => {
        let reqData = '';

        if (req.method === 'POST') {
          req.on('data', chunk => {
            reqData += chunk;
          });
          req.on('error', error => (0, _utils.logger)('error', `http: ${error}`));
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
            const reqJSON = JSON.parse(reqData);
            const operationName = reqJSON.operationName || reqJSON.query;
            const response = await (0, _gqlFunction.default)(reqJSON, resolverLoc, schemaLoc);
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            });
            res.write(response, 'utf8');
            res.end(() => {
              (0, _utils.logger)('info', `Response to: ${operationName}`);
            });
          });
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
    } else {
      return false;
    }
  }

  async startServer() {
    try {
      this.server.listen(this.port);
      return true;
    } catch (error) {
      (0, _utils.logger)('error', `dev: Unable to start server with error\n${error}`);
    }
  }

  async stopServer() {
    let stopResult;

    try {
      if (this.server) {
        this.server.close();
        this.server.on('close', () => {
          (0, _utils.logger)('info', 'dev: http server reloading ...');
        });
      } else {
        (0, _utils.logger)('warn', 'dev: Server does not exist');
      }

      stopResult = true;
    } catch (error) {
      (0, _utils.logger)('error', `dev: Unable to stop server with error\n${error}`);
      stopResult = false;
    } finally {
      return stopResult;
    }
  }

  async initServer() {
    if (this.createServer((await this.buildFunction()))) {
      return this.startServer();
    } else {
      return false;
    }
  }

}

var _default = devServer;
exports.default = _default;