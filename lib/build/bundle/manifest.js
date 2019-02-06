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
  let manifestArray = [];
  let i;

  for (i = 0; i < rootArray.length; i++) {
    const functionRoot = `${functionsDir}/${rootArray[i]}`; // console.log(`iteration: ${i}, root: ${functionRoot}`)

    if ((0, _fs.lstatSync)(functionRoot).isDirectory()) {
      if ((0, _fs.existsSync)(`${functionRoot}/index.mjs`)) {
        manifestArray.push(rootArray[i]); // console.log(`${rootArray[i]} added to manifest`)
      }
    }
  }

  return manifestArray;
};

exports.default = _default;