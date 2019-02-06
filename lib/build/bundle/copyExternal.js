"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _path = require("path");

var _fs = require("fs");

var _setDestDir = _interopRequireDefault(require("./setDestDir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const copyFilesFolders = async (inputDir, output, external, dist) => {
  const source = (0, _path.join)(inputDir, external);

  if ((0, _fs.existsSync)(source)) {
    if ((0, _fs.lstatSync)(source).isDirectory()) {
      (0, _utils.copyFolderRecursiveSync)(source, (0, _path.join)(output, external));

      if (dist) {
        const fullDist = (0, _setDestDir.default)(dist);

        if ((0, _fs.existsSync)(fullDist)) {
          (0, _utils.copyFolderRecursiveSync)(source, (0, _path.join)(fullDist, external));
        } else {
          (0, _utils.logger)('warn', `Unable to copy external data to '${dist}' as it does not exist`);
        }
      }
    } else {
      (0, _fs.copyFileSync)(source, (0, _path.join)(output, external));

      if (dist) {
        const fullDist = (0, _setDestDir.default)(dist);

        if ((0, _fs.existsSync)(fullDist)) {
          (0, _fs.copyFileSync)(source, (0, _path.join)(fullDist, external));
        } else {
          (0, _utils.logger)('warn', `Unable to copy external data to '${dist}' as it does not exist`);
        }
      }
    }
  } else {
    (0, _utils.logger)('warn', `Unable to copy external data. '${source}' does not exist`);
  }
};

const copyExternal = async ({
  provider,
  external,
  input,
  output
}) => {
  try {
    (0, _utils.logger)('info', `${provider.name}: Copying external data`);
    const inputDir = (0, _path.join)((0, _path.dirname)(input), 'resolvers');
    const dist = provider.dist ? provider.dist : false;

    if (Array.isArray(external)) {
      const arrLength = external.length;

      for (let i = 0; i < arrLength; i++) {
        await copyFilesFolders(inputDir, output, external[i], dist);
      }

      return true;
    } else {
      await copyFilesFolders(inputDir, output, external, dist);
    }
  } catch (error) {
    (0, _utils.logger)('warn', `Unable to copy external data with error:\n${error}`);
  }
};

var _default = copyExternal;
exports.default = _default;