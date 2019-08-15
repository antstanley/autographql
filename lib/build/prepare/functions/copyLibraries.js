"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _fs = require("fs");

var _path = require("path");

var _setTemplateLocation = _interopRequireDefault(require("./setTemplateLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const copyLibraries = async (libArray, functionLocation) => {
  let result;

  try {
    for (let i = 0; i < libArray.length; i++) {
      const libLocation = (0, _setTemplateLocation.default)(libArray[i]);
      const libStat = (0, _fs.lstatSync)(libLocation);

      if (libStat.isFile()) {
        (0, _fs.copyFileSync)(libLocation, (0, _path.join)(functionLocation, (0, _path.basename)(libLocation)));
      } else {
        if (libStat.isDirectory()) {
          (0, _utils.copyFolderRecursiveSync)(libLocation, functionLocation);
        } else {
          (0, _utils.logger)('warn', `copyLibraries: ${libArray[i]} is not a valid file or directory location`);
        }
      }
    }

    result = true;
  } catch (error) {
    (0, _utils.logger)('error', `copyLibraries: Copying libraries failed.\nError:${error.message}\n${error.stack}`);
    result = false;
  }

  return result;
};

var _default = copyLibraries;
exports.default = _default;