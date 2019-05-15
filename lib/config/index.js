"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadConfig = _interopRequireDefault(require("./loadConfig"));

var _validateConfig = _interopRequireDefault(require("./validateConfig"));

var _path = require("path");

var _utils = require("../utils");

var _setProjectRoot = _interopRequireDefault(require("./setProjectRoot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const projectRoot = (0, _setProjectRoot.default)();

const configOptions = async configFile => {
  let options = {};
  (0, _utils.logger)('info', 'Getting config...');
  const configDefaults = {
    name: 'graphql',
    root: './.autographql/',
    schema: './src/schema/schema.gql',
    resolvers: './src/resolvers',
    external: false,
    rollup: {
      resolve: {
        module: false,
        main: true,
        extensions: ['.mjs', '.js', '.json'],
        preferBuiltins: true
      },
      json: {
        preferConst: true
      },
      commonjs: {},
      babel: {
        presets: [['@babel/preset-env', {
          targets: {
            node: '8'
          }
        }]],
        plugins: ['@babel/plugin-syntax-import-meta']
      },
      warnings: ['CIRCULAR_DEPENDENCY']
    }
  };
  const providerDefaults = [{
    provider: 'aws'
  }, {
    provider: 'ibm'
  }, {
    provider: 'gcp'
  }, {
    provider: 'now'
  }];
  const devDefaults = {
    port: 7000
  };
  const config = configFile ? await (0, _loadConfig.default)(configFile) : false;

  if (config) {
    for (let setting in configDefaults) {
      if (config.hasOwnProperty(setting)) {
        if (setting === 'root') {
          // this bit is to make sure the root of the .autographql folder where build assets isn't the root of the project... otherwise the build will remove the whole project, which is less than ideal.. not that it ever happened to me, not at all...
          if (config[setting].indexOf('.autographql') === -1) {
            options[setting] = `${config[setting]}/.autographql`;
          } else {
            options[setting] = config[setting];
          }
        } else {
          options[setting] = config[setting];
        }
      } else {
        options[setting] = configDefaults[setting];
      }
    }

    if (config.functions) {
      options.functions = config.functions;
    } else {
      options.providers = providerDefaults;
    }

    if (config.dev) {
      if (config.dev.port) {
        options.dev = config.dev;
      } else {
        options.dev = devDefaults;
      }
    } else {
      options.dev = devDefaults;
    }
  } else {
    (0, _utils.logger)('info', 'No config file specified, loading defaults...');
    options = configDefaults;
    options.functions = providerDefaults;
    options.dev = devDefaults;
  }

  for (let setting in options) {
    if (setting === 'root' || setting === 'schema' || setting === 'resolvers') {
      options[setting] = (0, _path.join)(projectRoot, options[setting]);
    }
  }

  return (0, _validateConfig.default)(options);
};

var _default = configOptions;
exports.default = _default;