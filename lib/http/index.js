"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpServer = _interopRequireDefault(require("./httpServer"));

var _utils = require("../utils");

var _build = _interopRequireDefault(require("./build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initHttpServer = async options => {
  try {
    const root = options.root,
          resolvers = options.resolvers,
          schema = options.schema,
          dev = options.dev,
          external = options.external;
    const port = dev ? dev.port ? dev.port : 7000 : 7000;
    (0, _utils.logger)('info', 'dev: starting http server');
    /*
    logger(
      'warn',
      `root: ${root}\nresolvers: ${resolvers}\nschema: ${schema}\nport: ${port}`
    )
    */

    const _buildHttp = (0, _build.default)({
      root,
      schema,
      resolvers,
      external
    }),
          resolverLoc = _buildHttp.resolverLoc,
          schemaLoc = _buildHttp.schemaLoc;

    if (resolverLoc && schemaLoc) {
      if ((0, _httpServer.default)(port, resolverLoc, schemaLoc)) {
        (0, _utils.logger)('info', `dev: http server starting at http://localhost:${port}`);
      } else {
        (0, _utils.logger)('warn', 'dev: Unable to start http server');
      }
    } else {
      (0, _utils.logger)('warn', `dev: Unable to bundle schema & resolvers\n schema: ${schemaLoc}\nresolver:${resolverLoc}`);
    }
  } catch (error) {
    (0, _utils.logger)('error', `Unable to init http server with error:\n ${error}`);
  }
};

var _default = initHttpServer;
exports.default = _default;