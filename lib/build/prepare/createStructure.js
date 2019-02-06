"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _fs = require("fs");

const createStructure = rootDir => {
  try {
    (0, _utils.logger)('info', 'Creating directory structure ...'); // check if folder exsists

    if ((0, _fs.existsSync)(rootDir)) {
      (0, _utils.removeFolder)(rootDir);
    } // create directory strucuture


    (0, _fs.mkdirSync)(`${rootDir}`);
    (0, _fs.mkdirSync)(`${rootDir}/build`);
    (0, _fs.mkdirSync)(`${rootDir}/build/functions`);
    (0, _fs.mkdirSync)(`${rootDir}/dist`);
    (0, _fs.mkdirSync)(`${rootDir}/dist/functions`);
    return true;
  } catch (error) {
    (0, _utils.logger)('error', `createStructure error: ${error}`);
    return false;
  }
};

var _default = createStructure;
exports.default = _default;