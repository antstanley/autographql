"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _config = _interopRequireDefault(require("./config"));

var _build = _interopRequireDefault(require("../build"));

var _http = _interopRequireDefault(require("../http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = async args => {
  try {
    const validCommands = ['bundle', 'dev', 'deploy'];
    const command = args._[0] || null;

    if (command) {
      if (validCommands.includes(command)) {
        const configFile = args.config || args.c || false;
        const resolvers = args.resolvers || args.r || false;
        const schema = args.schema || args.s || false;
        const functions = args.functions || args.p || false;
        const options = await (0, _config.default)(configFile, resolvers, schema, functions);

        switch (command) {
          case 'bundle':
            (0, _build.default)(options);
            break;

          case 'dev':
            (0, _http.default)(options);
            break;

          case 'deploy':
            (0, _utils.logger)('info', 'Deployment not supported at this time');
            break;
        }
      } else {
        (0, _utils.logger)('warn', `command: "${command}" not recognised`);
      }
    } else {
      (0, _utils.logger)('warn', `No command specified`);
    }
  } catch (error) {
    (0, _utils.logger)('error', `Error: ${error}`);
  }
};

var _default = cli;
exports.default = _default;