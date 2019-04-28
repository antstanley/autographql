"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _devServer = _interopRequireDefault(require("./devServer"));

var _utils = require("../utils");

var _chokidar = _interopRequireDefault(require("chokidar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initHttpServer = async options => {
  try {
    const resolvers = options.resolvers,
          schema = options.schema;
    let newServer = new _devServer.default(options);

    if (newServer.initServer()) {
      const watcher = _chokidar.default.watch([resolvers, schema]);

      watcher.on('ready', () => {
        watcher.on('change', () => {
          (0, _utils.logger)('info', `dev: Files changed, rebuilding function`);

          if (newServer.stopServer()) {
            newServer.initServer();
          }
        });
      });
    }
  } catch (error) {
    (0, _utils.logger)('error', `Unable to init http server with error:\n ${error}`);
  }
};

var _default = initHttpServer;
exports.default = _default;