"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("./logger"));

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginJson = _interopRequireDefault(require("rollup-plugin-json"));

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setResolve = async (resolveOptions, resolveDefault) => {
  if (resolveOptions) {
    if (typeof resolveOptions === 'object') {
      return Object.assign(resolveDefault, resolveOptions);
    } else {
      (0, _logger.default)('warn', 'Rollup Config: resolve options are not an object, using default.');
      return resolveDefault;
    }
  } else {
    return resolveDefault;
  }
};

const setJson = async (jsonOptions, jsonDefault) => {
  if (jsonOptions) {
    if (typeof jsonOptions === 'object') {
      return Object.assign(jsonDefault, jsonOptions);
    } else {
      (0, _logger.default)('warn', 'Rollup Config: json options are not an object, using default.');
      return jsonDefault;
    }
  } else {
    return jsonDefault;
  }
};

const setCommonjs = async (commonjsOptions, commonjsDefault) => {
  if (commonjsOptions) {
    if (typeof commonjsOptions === 'object') {
      return Object.assign(commonjsDefault, commonjsOptions);
    } else {
      (0, _logger.default)('warn', 'Rollup Config: commonjs options are not an object, using default.');
      return commonjsDefault;
    }
  } else {
    return commonjsDefault;
  }
};

const setBabel = async (babelOptions, babelDefault) => {
  if (babelOptions) {
    if (typeof babelOptions === 'object') {
      return Object.assign(babelDefault, babelOptions);
    } else {
      (0, _logger.default)('warn', 'Rollup Config: babel options are not an object, using default.');
      return babelDefault;
    }
  } else {
    return babelDefault;
  }
};

const setExternal = async (externalArray, externalDefault) => {
  if (externalArray) {
    if (Array.isArray(externalArray)) {
      return externalArray;
    } else {
      (0, _logger.default)('warn', 'Rollup Config: commonjs options are not an object, using default.');
      return externalDefault;
    }
  } else {
    return externalDefault;
  }
};

const setWarning = async (warningArray, warningDefault) => {
  if (warningArray) {
    if (Array.isArray(warningArray)) {
      return warningArray;
    } else {
      return warningDefault;
    }
  } else {
    return warningDefault;
  }
};

const bundleOptions = async (rollupOptions, input) => {
  try {
    let resolveOptions = {
      mainFields: ['module', 'main'],
      extensions: ['.mjs', '.js', '.json'],
      preferBuiltins: true
    };
    let jsonOptions = {
      preferConst: true
    };
    let commonjsOptions = {};
    let babelOptions = {
      presets: [['@babel/preset-env', {
        targets: {
          node: '8'
        }
      }]],
      plugins: ['@babel/plugin-syntax-import-meta']
    };
    let externalOptions = ['stream', 'url', 'http', 'https', 'crypto', 'buffer', 'zlib'];
    let warningOptions = ['CIRCULAR_DEPENDENCY'];

    if (rollupOptions) {
      resolveOptions = await setResolve(rollupOptions.resolve, resolveOptions);
      jsonOptions = await setJson(rollupOptions.json, jsonOptions);
      commonjsOptions = await setCommonjs(rollupOptions.commonjs, commonjsOptions);
      babelOptions = await setBabel(rollupOptions.babel, babelOptions);
      externalOptions = await setExternal(rollupOptions.external, externalOptions);
      warningOptions = await setWarning(rollupOptions.warning, warningOptions);
    }

    const inputOptions = {
      input,
      external: externalOptions,
      plugins: [(0, _rollupPluginNodeResolve.default)(resolveOptions), (0, _rollupPluginJson.default)(jsonOptions), (0, _rollupPluginCommonjs.default)(commonjsOptions), (0, _rollupPluginBabel.default)(babelOptions)],

      onwarn(warning, warn) {
        if (Array.isArray(warningOptions)) {
          if (warningOptions.includes(warning.code)) {
            return;
          }
        }

        warn(warning);
      }

    };
    return inputOptions;
  } catch (error) {
    (0, _logger.default)('error', `rollupDefault: ${error}`);
  }
};

var _default = bundleOptions;
exports.default = _default;