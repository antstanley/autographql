"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollup = require("rollup");

var _fs = _interopRequireDefault(require("fs"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
*/
async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await (0, _rollup.rollup)(inputOptions); // generate code

  const _ref = await bundle.generate(outputOptions),
        code = _ref.code;

  _fs.default.writeFileSync(`${outputOptions.dir}index.js`, code);

  return true;
}

var _default = async ({
  provider,
  name,
  distName,
  input,
  output
}, rollupConfig) => {
  //  console.log(output)
  (0, _utils.logger)('info', `${provider} - ${name}: Generating bundled function`);

  try {
    if ((0, _utils.removeFolder)(distName)) {
      _fs.default.mkdirSync(distName);

      _fs.default.mkdirSync(output);
    }

    if (_fs.default.existsSync(input)) {
      // bundle
      const inputOptions = await (0, _utils.rollupDefault)(rollupConfig, input);
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
      (0, _utils.logger)('error', 'Entry Point does not exist');
    }
  } catch (error) {
    (0, _utils.logger)('error', error.stack);
  }
};

exports.default = _default;