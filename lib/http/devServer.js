"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _utils = require("../utils");

var _gqlFunction = _interopRequireDefault(require("./gqlFunction"));

var _build = _interopRequireDefault(require("./build"));

var _validateOpenId = _interopRequireDefault(require("./validateOpenId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class devServer {
  constructor(options) {
    const root = options.root,
          resolvers = options.resolvers,
          schema = options.schema,
          openid = options.openid,
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
    this.openid = openid || false;
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
      }, this.port);
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
            const queryContext = {
              req,
              body: reqData
            };

            if (this.openid) {
              if (req.headers.authorization) {
                const authHeader = req.headers.authorization;
                const token = authHeader.substr(7);
                queryContext['jwt'] = await (0, _validateOpenId.default)(token, this.openid);
              } else {
                queryContext['jwt'] = {
                  valid: false,
                  token: null,
                  decoded: null
                };
              }
            }

            const reqJSON = JSON.parse(reqData);
            const operationName = reqJSON.operationName || reqJSON.query;
            const response = await (0, _gqlFunction.default)(reqJSON, resolverLoc, schemaLoc, queryContext);
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            });
            res.write(response, 'utf8');
            res.end(() => {
              if (!queryContext.jwt) {
                (0, _utils.logger)('info', `dev: Response to: ${operationName}`);
              } else {
                if (queryContext.jwt.valid) {
                  (0, _utils.logger)('info', `dev: Authenticated response to: ${operationName}`);
                } else {
                  (0, _utils.logger)('warn', `dev: Unauthenticated response to: ${operationName}`);
                }
              }
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
      if (this.server) {
        this.server.listen(this.port);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      (0, _utils.logger)('error', `dev: Unable to start server with error\n${error}`);
      return false;
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