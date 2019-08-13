function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { copyFolderRecursiveSync, logger } from '../../utils';
import { dirname, join } from 'path';
import { existsSync, lstatSync, copyFileSync } from 'fs';

var copyFilesFolders =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (input, output, external) {
    var inputDir = lstatSync(input).isFile() ? dirname(input) : input;
    var source = join(inputDir, external);

    if (existsSync(source)) {
      if (lstatSync(source).isDirectory()) {
        copyFolderRecursiveSync(source, join(output, external));
      } else {
        copyFileSync(source, join(output, external));
      }
    } else {
      logger('warn', "Unable to copy external data. '" + source + "' does not exist");
    }
  });

  return function copyFilesFolders(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var copyExternal =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      external,
      input,
      output
    } = _ref2;

    try {
      logger('info', "dev: Copying external data");

      if (Array.isArray(external)) {
        var arrLength = external.length;

        for (var i = 0; i < arrLength; i++) {
          yield copyFilesFolders(input, output, external[i]);
        }

        return true;
      } else {
        yield copyFilesFolders(input, output, external);
      }
    } catch (error) {
      logger('warn', "Unable to copy external data with error:\n" + error);
    }
  });

  return function copyExternal(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

export default copyExternal;