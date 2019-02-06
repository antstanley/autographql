"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _fs = require("fs");

const copyResolvers = (build, location) => {
  try {
    if ((0, _fs.lstatSync)(location).isDirectory()) {
      (0, _utils.copyFolderRecursiveSync)(location, build);
      return true;
    } else {
      (0, _utils.logger)('warn', 'Resolver location is not a directory');
      return false;
    }
  } catch (error) {
    (0, _utils.logger)('error', `copyResolvers error: ${error}`);
    return false;
  }
};

var _default = copyResolvers;
exports.default = _default;