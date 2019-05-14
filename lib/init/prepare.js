"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _fs = require("fs");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initConfig = async ({
  options,
  configFile
}) => {
  try {
    const resolvers = options.resolvers,
          schema = options.schema;
    const resolverDir = (0, _path.join)(process.cwd(), resolvers);

    if (!(0, _fs.existsSync)(resolverDir)) {
      (0, _mkdirp.default)(resolverDir);
      (0, _fs.writeFileSync)((0, _path.join)(resolverDir, 'index.js'), '');
      (0, _utils.logger)('info', `init: Resolver directory created`);
    }

    const fullSchema = (0, _path.join)(process.cwd(), schema);
    const schemaDir = (0, _path.dirname)(fullSchema);

    if (!(0, _fs.existsSync)(schemaDir)) {
      _mkdirp.default.sync(schemaDir);

      (0, _utils.logger)('info', `init: Schema directory created`);
    }

    if (!(0, _fs.existsSync)(fullSchema)) {
      (0, _fs.writeFileSync)(fullSchema, '');
    }

    const fullConfig = (0, _path.join)(process.cwd(), configFile);

    if (!(0, _fs.existsSync)(fullConfig)) {
      (0, _fs.writeFileSync)(fullConfig, JSON.stringify(options));
    } else {
      (0, _utils.logger)('error', `${fullConfig} already exists.`);
    }

    (0, _utils.logger)('info', `Project config and scaffolding created.`);
    return true;
  } catch (error) {
    (0, _utils.logger)('error', `init project error: ${error}`);
    return false;
  }
};

var _default = initConfig;
exports.default = _default;