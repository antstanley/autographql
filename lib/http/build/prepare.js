"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _fs = require("fs");

const httpPrepare = rootDir => {
  try {
    const serverDir = `${rootDir}/http`; // check if folder exsists

    if ((0, _fs.existsSync)(rootDir)) {
      (0, _utils.removeFolder)(serverDir);
      (0, _fs.mkdirSync)(serverDir);
    } else {
      (0, _fs.mkdirSync)(rootDir);
      (0, _fs.mkdirSync)(serverDir);
    }

    return true;
  } catch (error) {
    (0, _utils.logger)('error', `httpPrepare error: ${error}`);
    return false;
  }
};

var _default = httpPrepare;
exports.default = _default;