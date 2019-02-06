"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const copyFileSync = (source, target) => {
  let targetFile = target; // if target is a directory a new file with the same name will be created

  if (_fs.default.existsSync(target)) {
    if (_fs.default.lstatSync(target).isDirectory()) {
      targetFile = (0, _path.join)(target, (0, _path.basename)(source));
    }
  }

  _fs.default.writeFileSync(targetFile, _fs.default.readFileSync(source));
};

const copyFolderRecursiveSync = (source, target) => {
  let files = []; // check if folder needs to be created or integrated

  const targetFolder = target;

  if (!_fs.default.existsSync(targetFolder)) {
    _fs.default.mkdirSync(targetFolder);
  } // copy


  if (_fs.default.lstatSync(source).isDirectory()) {
    files = _fs.default.readdirSync(source);
    files.forEach(function (file) {
      const curSource = (0, _path.join)(source, file);

      if (_fs.default.lstatSync(curSource).isDirectory()) {
        const newTarget = (0, _path.join)(targetFolder, file);
        copyFolderRecursiveSync(curSource, newTarget);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

var _default = copyFolderRecursiveSync;
exports.default = _default;