function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import logger from './logger';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const setResolve =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (resolveOptions, resolveDefault) {
    if (resolveOptions) {
      if (typeof resolveOptions === 'object') {
        return Object.assign(resolveDefault, resolveOptions);
      } else {
        logger('warn', 'Rollup Config: resolve options are not an object, using default.');
        return resolveDefault;
      }
    } else {
      return resolveDefault;
    }
  });

  return function setResolve(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const setJson =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (jsonOptions, jsonDefault) {
    if (jsonOptions) {
      if (typeof jsonOptions === 'object') {
        return Object.assign(jsonDefault, jsonOptions);
      } else {
        logger('warn', 'Rollup Config: json options are not an object, using default.');
        return jsonDefault;
      }
    } else {
      return jsonDefault;
    }
  });

  return function setJson(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

const setCommonjs =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (commonjsOptions, commonjsDefault) {
    if (commonjsOptions) {
      if (typeof commonjsOptions === 'object') {
        return Object.assign(commonjsDefault, commonjsOptions);
      } else {
        logger('warn', 'Rollup Config: commonjs options are not an object, using default.');
        return commonjsDefault;
      }
    } else {
      return commonjsDefault;
    }
  });

  return function setCommonjs(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

const setBabel =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(function* (babelOptions, babelDefault) {
    if (babelOptions) {
      if (typeof babelOptions === 'object') {
        return Object.assign(babelDefault, babelOptions);
      } else {
        logger('warn', 'Rollup Config: babel options are not an object, using default.');
        return babelDefault;
      }
    } else {
      return babelDefault;
    }
  });

  return function setBabel(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

const setExternal =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(function* (externalArray, externalDefault) {
    if (externalArray) {
      if (Array.isArray(externalArray)) {
        return externalArray;
      } else {
        logger('warn', 'Rollup Config: commonjs options are not an object, using default.');
        return externalDefault;
      }
    } else {
      return externalDefault;
    }
  });

  return function setExternal(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

const setWarning =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(function* (warningArray, warningDefault) {
    if (warningArray) {
      if (Array.isArray(warningArray)) {
        return warningArray;
      } else {
        return warningDefault;
      }
    } else {
      return warningDefault;
    }
  });

  return function setWarning(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

const bundleOptions =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(function* (rollupOptions, input) {
    let resolveOptions = {
      module: false,
      main: true,
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
    let externalOptions = [];
    let warningOptions = ['CIRCULAR_DEPENDENCY'];

    if (rollupOptions) {
      resolveOptions = yield setResolve(rollupOptions.resolve, resolveOptions);
      jsonOptions = yield setJson(rollupOptions.json, jsonOptions);
      commonjsOptions = yield setCommonjs(rollupOptions.commonjs, commonjsOptions);
      babelOptions = yield setBabel(rollupOptions.babel, babelOptions);
      externalOptions = yield setExternal(rollupOptions.external, externalOptions);
      warningOptions = yield setWarning(rollupOptions.warning, warningOptions);
    }

    const inputOptions = {
      input,
      external: externalOptions,
      plugins: [resolve(resolveOptions), json(jsonOptions), commonjs(commonjsOptions), babel(babelOptions)],

      onwarn(warning, warn) {
        if (warningOptions.include(warning.code)) {
          return;
        }

        warn(warning);
      }

    };
    return inputOptions;
  });

  return function bundleOptions(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

export default bundleOptions;