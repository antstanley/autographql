"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollup = require("rollup");

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginJson = _interopRequireDefault(require("rollup-plugin-json"));

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

var _fs = _interopRequireDefault(require("fs"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await (0, _rollup.rollup)(inputOptions); // generate code

  const _ref = await bundle.generate(outputOptions),
        code = _ref.code;

  _fs.default.writeFileSync(`${outputOptions.dir}index.js`, code);

  return true;
}

var _default = async ({
  name,
  distName,
  input,
  output
}) => {
  //  console.log(output)
  (0, _utils.logger)('info', `${name}: Generating bundled function`);

  if ((0, _utils.removeFolder)(distName)) {
    _fs.default.mkdirSync(distName);

    _fs.default.mkdirSync(output);
  }

  if (_fs.default.existsSync(input)) {
    // bundle
    const inputOptions = {
      input,
      plugins: [(0, _rollupPluginNodeResolve.default)({
        module: false,
        main: true,
        extensions: ['.mjs', '.js', '.json'],
        preferBuiltins: true
      }), (0, _rollupPluginJson.default)({
        preferConst: true
      }), (0, _rollupPluginCommonjs.default)(), (0, _rollupPluginBabel.default)({
        presets: [['@babel/preset-env', {
          targets: {
            node: '8'
          }
        }]],
        plugins: ['@babel/plugin-syntax-import-meta']
      })],

      onwarn(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          return;
        }

        warn(warning);
      }

    };
    const outputOptions = {
      format: 'cjs',
      file: 'index.js',
      dir: output
    };
    return build(inputOptions, outputOptions);
  } else {
    (0, _utils.logger)('error', 'Entry Point does not exist');
  }
};

exports.default = _default;