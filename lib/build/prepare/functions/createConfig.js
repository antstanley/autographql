"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _fs = require("fs");

var _path = require("path");

const createConfig = async (config, functionLocation) => {
  try {
    (0, _fs.writeFileSync)((0, _path.join)(functionLocation, 'config.json'), JSON.stringify(config));
  } catch (error) {
    (0, _utils.logger)('error', `createConfig: Unable to create config.json with error.\n${error.message}\n${error.stack}`);
  }
};

var _default = createConfig;
exports.default = _default;