"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "removeFolder", {
  enumerable: true,
  get: function () {
    return _removeFolder.default;
  }
});
Object.defineProperty(exports, "copyFolderRecursiveSync", {
  enumerable: true,
  get: function () {
    return _copyFolderRecursiveSync.default;
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _logger.default;
  }
});

var _removeFolder = _interopRequireDefault(require("./removeFolder"));

var _copyFolderRecursiveSync = _interopRequireDefault(require("./copyFolderRecursiveSync"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }