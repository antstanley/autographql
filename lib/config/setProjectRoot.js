"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const setProjectRoot = () => {
  const baseURL = new URL('file://');
  baseURL.pathname = `${process.cwd()}/`;
  const projectRoot = new URL(baseURL).pathname;
  return projectRoot;
};

var _default = setProjectRoot;
exports.default = _default;