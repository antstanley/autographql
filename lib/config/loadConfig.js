"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _utils = require("../utils");

var _yaml = _interopRequireDefault(require("yaml"));

var _setProjectRoot = _interopRequireDefault(require("./setProjectRoot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const projectRoot = (0, _setProjectRoot.default)();

const loadDefault = () => {
  if ((0, _fs.existsSync)((0, _path.join)(projectRoot, './autographql.config.json'))) {
    return JSON.parse((0, _fs.readFileSync)((0, _path.join)(projectRoot, './autographql.config.json'), 'utf-8'));
  } else {
    if ((0, _fs.existsSync)((0, _path.join)(projectRoot, './autographql.config.yml'))) {
      return _yaml.default.parse((0, _fs.readFileSync)((0, _path.join)(projectRoot, './autographql.config.yml'), 'utf-8'));
    } else {
      (0, _utils.logger)('warn', 'No autographql.config.json or autographql.config.yml found, using defaults.');
      return null;
    }
  }
};

const checkExtension = filename => {
  if (filename.includes('.yml')) {
    return 'YAML';
  } else {
    if (filename.includes('.json')) {
      return 'JSON';
    } else {
      (0, _utils.logger)('warn', 'Incorrect file type specified. Please use a .json or .yml file. Using defaults');
      return null;
    }
  }
};

const loadConfig = configFile => {
  if (configFile) {
    const fullFileName = (0, _path.join)(projectRoot, configFile);

    if ((0, _fs.existsSync)(fullFileName)) {
      const fileExt = checkExtension(configFile);

      if (fileExt === 'YAML') {
        return _yaml.default.parse((0, _fs.readFileSync)(fullFileName, 'utf-8'));
      } else {
        if (fileExt === 'JSON') {
          return JSON.parse((0, _fs.readFileSync)(fullFileName, 'utf-8'));
        } else {
          return null;
        }
      }
    } else {
      (0, _utils.logger)('warn', 'Config file specified does not exist, searching default config location.');
      return loadDefault();
    }
  } else {
    return loadDefault();
  }
};

var _default = loadConfig;
exports.default = _default;