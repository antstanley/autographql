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

var _fs = require("fs");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function build(inputOptions, outputOptions, outputLoc) {
  // create a bundle
  const bundle = await (0, _rollup.rollup)(inputOptions); // generate code

  const _ref = await bundle.generate(outputOptions),
        code = _ref.code; // logger(`warn`, `code: ${code}`)


  (0, _fs.writeFileSync)(outputLoc, code);
  return true;
}

var _default = async (resolver, outputLoc) => {
  //  console.log(output)
  (0, _utils.logger)('info', `dev: Generating bundled resolver ...`);
  const input = `${resolver}/index.mjs`; // bundle

  if ((0, _fs.existsSync)(resolver)) {
    const inputOptions = {
      input,
      plugins: [(0, _rollupPluginNodeResolve.default)({
        module: false,
        main: true,
        extensions: ['.mjs', '.js', '.json']
      }), (0, _rollupPluginCommonjs.default)(), (0, _rollupPluginJson.default)({
        preferConst: true
      }), (0, _rollupPluginBabel.default)({
        presets: [['@babel/preset-env', {
          targets: {
            node: '8'
          }
        }]],
        plugins: ['@babel/plugin-syntax-import-meta']
      })]
    };
    const outputOptions = {
      format: 'cjs'
    };
    return build(inputOptions, outputOptions, outputLoc);
  } else {
    (0, _utils.logger)('warn', `Path to ${resolver} doesn't exit`);
    return null;
  }
};

exports.default = _default;