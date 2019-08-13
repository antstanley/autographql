"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _path = require("path");

var _fs = require("fs");

const copyFilesFolders = async (input, output, external) => {
  const inputDir = (0, _fs.lstatSync)(input).isFile() ? (0, _path.dirname)(input) : input;
  const source = (0, _path.join)(inputDir, external);

  if ((0, _fs.existsSync)(source)) {
    if ((0, _fs.lstatSync)(source).isDirectory()) {
      (0, _utils.copyFolderRecursiveSync)(source, (0, _path.join)(output, external));
    } else {
      (0, _fs.copyFileSync)(source, (0, _path.join)(output, external));
    }
  } else {
    (0, _utils.logger)('warn', `Unable to copy external data. '${source}' does not exist`);
  }
};

const copyExternal = async ({
  external,
  input,
  output
}) => {
  try {
    (0, _utils.logger)('info', `dev: Copying external data`);

    if (Array.isArray(external)) {
      const arrLength = external.length;

      for (let i = 0; i < arrLength; i++) {
        await copyFilesFolders(input, output, external[i]);
      }

      return true;
    } else {
      await copyFilesFolders(input, output, external);
    }
  } catch (error) {
    (0, _utils.logger)('warn', `Unable to copy external data with error:\n${error}`);
  }
};

var _default = copyExternal;
exports.default = _default;