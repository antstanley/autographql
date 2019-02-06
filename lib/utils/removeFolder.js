"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const removeFolder = path => {
  // console.log(`path: ${path}`)
  if (_fs.default.existsSync(path)) {
    _fs.default.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;

      if (_fs.default.lstatSync(curPath).isDirectory()) {
        // recurse
        removeFolder(curPath);
      } else {
        // delete file
        _fs.default.unlinkSync(curPath);
      }
    });

    _fs.default.rmdirSync(path);

    return true;
  } else {
    // console.log('Folder does not exist')
    return true;
  }
};

var _default = removeFolder;
exports.default = _default;