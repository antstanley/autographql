"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

const setDestDir = joinDir => {
  const baseURL = new URL('file://');
  baseURL.pathname = `${process.cwd()}/`;
  const projectRoot = (0, _path.join)(baseURL.pathname, joinDir);
  return projectRoot;
};

var _default = setDestDir;
exports.default = _default;