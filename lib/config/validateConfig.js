"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

const validConfig = config => {
  if (!(0, _fs.existsSync)(config.schema)) {
    throw new Error(`Schema file does not exist at location: ${config.schema}`);
  }

  if (!(0, _fs.existsSync)(config.resolvers)) {
    throw new Error(`Resolvers do not exist at location: ${config.resolvers}`);
  }

  if (!config.name) {
    throw new Error(`Function name not specified`);
  }

  return config;
};

var _default = validConfig;
exports.default = _default;