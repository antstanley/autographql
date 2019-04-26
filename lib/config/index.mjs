function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import loadConfig from './loadConfig';
import validateConfig from './validateConfig';
import { join } from 'path';
import { logger } from '../utils';
import setProjectRoot from './setProjectRoot';
const projectRoot = setProjectRoot();

const configOptions =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (configFile) {
    let options = {};
    logger('info', 'Getting config...');
    const configDefaults = {
      name: 'graphql',
      root: './.autographql/',
      schema: './src/schema/schema.gql',
      resolvers: './src/resolvers',
      external: false,
      rollup: {
        babel: {
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
    const config = configFile ? yield loadConfig(configFile) : false;

    if (config) {
      for (let setting in configDefaults) {
        if (config.hasOwnProperty(setting)) {
          if (setting === 'root') {
            // this bit is to make sure the root of the .autographql folder where build assets isn't the root of the project... otherwise the build will remove the whole project, which is less than ideal.. not that it ever happened to me, not at all...
            if (config[setting].indexOf('.autographql') === -1) {
              options[setting] = config[setting] + "/.autographql";
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
      logger('info', 'No config file specified, loading defaults...');
      options = configDefaults;
      options.functions = providerDefaults;
      options.dev = devDefaults;
    }

    for (let setting in options) {
      if (setting === 'root' || setting === 'schema' || setting === 'resolvers') {
        options[setting] = join(projectRoot, options[setting]);
      }
    }

    return validateConfig(options);
  });

  return function configOptions(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default configOptions;