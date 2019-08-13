"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _fs = require("fs");

var _path = require("path");

const copyResolvers = (build, location) => {
  try {
    const fileStat = (0, _fs.lstatSync)(location);

    if (fileStat.isDirectory()) {
      (0, _utils.copyFolderRecursiveSync)(location, build);
      return true;
    } else {
      if (fileStat.isFile()) {
        (0, _utils.copyFolderRecursiveSync)((0, _path.dirname)(location), build);
        return true;
      } else {
        (0, _utils.logger)('warn', 'Resolver location is not a directory');
        return false;
      }
    }
  } catch (error) {
    (0, _utils.logger)('error', `copyResolvers error: ${error}`);
    return false;
  }
};

var _default = copyResolvers;
exports.default = _default;