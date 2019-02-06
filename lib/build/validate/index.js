"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _fs = require("fs");

const validateSDL = async gqlSDL => {
  return (0, _graphql.parse)(gqlSDL);
};

var _default = async location => {
  try {
    const gqlSDL = (0, _fs.readFileSync)(location, 'utf-8');
    return validateSDL(gqlSDL);
  } catch (error) {
    throw new Error(`Unable to parse Schema with error:\n${error}`);
  }
};

exports.default = _default;