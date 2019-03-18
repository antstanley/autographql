function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { rollup } from 'rollup';
/*
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
*/

import fs from 'fs';
import { removeFolder, logger, rollupDefault } from '../../utils';

function build(_x, _x2) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (inputOptions, outputOptions) {
    // create a bundle
    const bundle = yield rollup(inputOptions); // generate code

    const _ref3 = yield bundle.generate(outputOptions),
          code = _ref3.code;

    fs.writeFileSync(`${outputOptions.dir}index.js`, code);
    return true;
  });
  return _build.apply(this, arguments);
}

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(function* (_ref, rollupConfig) {
    let provider = _ref.provider,
        name = _ref.name,
        distName = _ref.distName,
        input = _ref.input,
        output = _ref.output;
    //  console.log(output)
    logger('info', `${provider} - ${name}: Generating bundled function`);

    try {
      if (removeFolder(distName)) {
        fs.mkdirSync(distName);
        fs.mkdirSync(output);
      }

      if (fs.existsSync(input)) {
        // bundle
        const inputOptions = yield rollupDefault(rollupConfig, input);
        /*
        const inputOptions = {
        input,
        plugins: [
          resolve({
            module: false,
            main: true,
            extensions: ['.mjs', '.js', '.json'],
            preferBuiltins: true
          }),
          json({
            preferConst: true
          }),
          commonjs(),
          babel({
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '8'
                  }
                }
              ]
            ],
            plugins: ['@babel/plugin-syntax-import-meta']
          })
        ],
        onwarn (warning, warn) {
          if (warning.code === 'CIRCULAR_DEPENDENCY') {
            return
          }
          warn(warning)
        }
        }
        */

        const outputOptions = {
          format: 'cjs',
          file: 'index.js',
          dir: output
        };
        return build(inputOptions, outputOptions);
      } else {
        logger('error', 'Entry Point does not exist');
      }
    } catch (error) {
      logger('error', error.stack);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();