function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import http from 'http';
import { logger, validateOpenId } from '../utils';
import gqlFunction from './gqlFunction';
import buildHttp from './build';

class devServer {
  constructor(options) {
    var {
      root,
      resolvers,
      schema,
      openid,
      dev,
      external,
      rollup
    } = options;
    this.root = root;
    this.resolvers = resolvers;
    this.schema = schema;
    this.external = external;
    this.rollup = rollup;
    this.port = dev ? dev.port ? dev.port : 7000 : 7000;
    this.server = null;
    this.openid = openid || false;
  }

  buildFunction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        _this.server = null;
        var buildResponse = yield buildHttp({
          root: _this.root,
          schema: _this.schema,
          resolvers: _this.resolvers,
          external: _this.external,
          rollup: _this.rollup
        }, _this.port);
        return buildResponse;
      } catch (error) {
        logger('error', "dev: Unable to build server with error\n" + error);
        return false;
      }
    })();
  }

  createServer(serverOpts) {
    var _this2 = this;

    if (serverOpts) {
      var {
        resolverLoc,
        schemaLoc
      } = serverOpts;
      this.server = http.createServer((req, res) => {
        var reqData = '';

        if (req.method === 'POST') {
          req.on('data', chunk => {
            reqData += chunk;
          });
          req.on('error', error => logger('error', "http: " + error));
          req.on('end',
          /*#__PURE__*/
          _asyncToGenerator(function* () {
            var queryContext = {
              req,
              body: reqData
            };

            if (_this2.openid) {
              if (req.headers.authorization) {
                var authHeader = req.headers.authorization;
                var token = authHeader.substr(7);
                queryContext['jwt'] = yield validateOpenId(token, _this2.openid);

                if (!queryContext.jwt.valid) {
                  logger('warn', 'dev: Token Validation Failed');
                }
              } else {
                queryContext['jwt'] = {
                  valid: false,
                  token: null,
                  decoded: null
                };
              }
            }

            var reqJSON = JSON.parse(reqData);
            var operationName = reqJSON.operationName || reqJSON.query;
            var response = yield gqlFunction(reqJSON, resolverLoc, schemaLoc, queryContext);
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            });
            res.write(response, 'utf8');
            res.end(() => {
              if (!queryContext.jwt) {
                logger('info', "dev: Response to: " + operationName);
              } else {
                if (queryContext.jwt.valid) {
                  logger('info', "dev: Authenticated response to: " + operationName);
                } else {
                  logger('warn', "dev: Unauthenticated response to: " + operationName);
                }
              }
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
    } else {
      return false;
    }
  }

  startServer() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        if (_this3.server) {
          _this3.server.listen(_this3.port);

          return true;
        } else {
          return false;
        }
      } catch (error) {
        logger('error', "dev: Unable to start server with error\n" + error);
        return false;
      }
    })();
  }

  stopServer() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var stopResult;

      try {
        if (_this4.server) {
          _this4.server.close();

          _this4.server.on('close', () => {
            logger('info', 'dev: http server reloading ...');
          });
        } else {
          logger('warn', 'dev: Server does not exist');
        }

        stopResult = true;
      } catch (error) {
        logger('error', "dev: Unable to stop server with error\n" + error);
        stopResult = false;
      } finally {
        return stopResult;
      }
    })();
  }

  initServer() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (_this5.createServer((yield _this5.buildFunction()))) {
        return _this5.startServer();
      } else {
        return false;
      }
    })();
  }

}

export default devServer;