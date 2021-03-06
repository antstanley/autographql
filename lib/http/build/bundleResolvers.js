"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollup = require("rollup");

var _fs = require("fs");

var _utils = require("../../utils");

async function build(inputOptions, outputOptions, port) {
  try {
    // create a bundle
    const bundle = await (0, _rollup.rollup)(inputOptions); // generate code & write bundled code

    await bundle.write(outputOptions);
    (0, _utils.logger)('info', `dev: http server ready on http://localhost:${port}`);
    return true;
  } catch (error) {
    (0, _utils.logger)('error', `bundleProject/build: ${error}`);
    return false;
  }
}

var _default = async (resolver, outputLoc, rollupConfig, port) => {
  //  console.log(output)
  (0, _utils.logger)('info', `dev: Generating bundled resolver ...`);

  try {
    const input = (0, _fs.lstatSync)(resolver).isFile() ? resolver : `${resolver}/index.mjs`; // bundle

    if ((0, _fs.existsSync)(resolver)) {
      const inputOptions = await (0, _utils.rollupDefault)(rollupConfig, input);
      const outputOptions = {
        format: 'cjs',
        file: outputLoc
      };
      return build(inputOptions, outputOptions, port);
    } else {
      (0, _utils.logger)('warn', `Path to ${resolver} doesn't exit`);
      return null;
    }
  } catch (error) {
    (0, _utils.logger)('error', `dev: Unable to bundle resolver with error. ${error}`);
  }
};

exports.default = _default;