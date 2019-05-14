"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollup = require("rollup");

var _fs = require("fs");

var _utils = require("../../utils");

async function build(inputOptions, outputOptions, outputLoc) {
  // create a bundle
  const bundle = await (0, _rollup.rollup)(inputOptions); // generate code

  const _ref = await bundle.generate(outputOptions),
        code = _ref.code; // logger(`warn`, `code: ${code}`)


  (0, _fs.writeFileSync)(outputLoc, code);
  (0, _utils.logger)('info', `dev: http server ready!`);
  return true;
}

var _default = async (resolver, outputLoc, rollupConfig) => {
  //  console.log(output)
  (0, _utils.logger)('info', `dev: Generating bundled resolver ...`);
  const input = `${resolver}/index.mjs`; // bundle

  if ((0, _fs.existsSync)(resolver)) {
    const inputOptions = await (0, _utils.rollupDefault)(rollupConfig, input);
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