"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _utils = require("../../utils");

var _setDestDir = _interopRequireDefault(require("./setDestDir"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const copyFunc = async ({
  output,
  functionConfig,
  provider,
  name
}) => {
  try {
    (0, _utils.logger)('info', `${provider} - ${name}: Copying function to distribution folder '${functionConfig.dist}'`);
    const dist = functionConfig.dist;
    const fileDestDir = (0, _setDestDir.default)(dist);
    const fileDest = (0, _path.join)(fileDestDir, 'index.js');
    const fileSrc = (0, _path.join)(output, 'index.js');

    if ((0, _fs.existsSync)(fileDestDir)) {
      if ((0, _fs.lstatSync)(fileDestDir).isDirectory()) {
        (0, _fs.copyFileSync)(fileSrc, fileDest);
        return true;
      } else {
        (0, _utils.logger)('warn', `Provider distribution location '${fileDestDir}' is not a directory`);
        return false;
      }
    } else {
      _mkdirp.default.sync(fileDestDir);

      (0, _fs.copyFileSync)(fileSrc, fileDest);
      return true;
    }
  } catch (error) {
    (0, _utils.logger)('warn', `${provider} - ${name}: Unable to copy function to location with error: ${error}`);
    return false;
  }
};

var _default = copyFunc;
exports.default = _default;