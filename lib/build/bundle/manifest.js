"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _default = async rootDir => {
  const functionsDir = `${rootDir}/build/functions`;
  const rootArray = (0, _fs.readdirSync)(functionsDir);
  if (rootArray.length <= 0) throw new Error('Invalid root path');
  const manifestArray = [];
  let i;

  for (i = 0; i < rootArray.length; i++) {
    const functionRoot = `${functionsDir}/${rootArray[i]}`;

    if ((0, _fs.existsSync)(functionRoot)) {
      manifestArray.push(rootArray[i]);
    }
  }

  return manifestArray;
};

exports.default = _default;