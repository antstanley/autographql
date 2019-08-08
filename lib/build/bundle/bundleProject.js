"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollup = require("rollup");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function build(inputOptions, outputOptions) {
  try {
    // create a bundle
    const bundle = await (0, _rollup.rollup)(inputOptions); // generate code
    // write bundled code

    await bundle.write(outputOptions);
    return true;
  } catch (error) {
    (0, _utils.logger)('error', `bundleProject/build: ${error}`);
    return false;
  }
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
      const outputOptions = {
        format: 'cjs',
        file: _path.default.join(output, 'index.js')
      };
      return build(inputOptions, outputOptions);
    } else {
      (0, _utils.logger)('error', 'Entry Point does not exist');
    }
  } catch (error) {
    (0, _utils.logger)('error', `bundleProject: ${error}`);
  }
};

exports.default = _default;