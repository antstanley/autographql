function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { copyFolderRecursiveSync, logger } from '../../utils';
import { dirname, join } from 'path';
import { existsSync, lstatSync, copyFileSync } from 'fs';
import setDestDir from './setDestDir';

var copyFilesFolders =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (inputDir, output, external, dist) {
    var source = join(inputDir, external);

    if (existsSync(source)) {
      if (lstatSync(source).isDirectory()) {
        copyFolderRecursiveSync(source, join(output, external));

        if (dist) {
          var fullDist = setDestDir(dist);

          if (existsSync(fullDist)) {
            copyFolderRecursiveSync(source, join(fullDist, external));
          } else {
            logger('warn', "Unable to copy external data to '" + dist + "' as it does not exist");
          }
        }
      } else {
        copyFileSync(source, join(output, external));

        if (dist) {
          var _fullDist = setDestDir(dist);

          if (existsSync(_fullDist)) {
            copyFileSync(source, join(_fullDist, external));
          } else {
            logger('warn', "Unable to copy external data to '" + dist + "' as it does not exist");
          }
        }
      }
    } else {
      logger('warn', "Unable to copy external data. '" + source + "' does not exist");
    }
  });

  return function copyFilesFolders(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var copyExternal =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      provider,
      name,
      functionConfig,
      external,
      input,
      output
    } = _ref2;

    try {
      logger('info', provider + " - " + name + ": Copying external data");
      var inputDir = join(dirname(input), 'resolvers');
      var dist = functionConfig.dist ? provider === 'azure' ? join(functionConfig.dist, name) : functionConfig.dist : false;

      if (Array.isArray(external)) {
        var arrLength = external.length;

        for (var i = 0; i < arrLength; i++) {
          yield copyFilesFolders(inputDir, output, external[i], dist);
        }

        return true;
      } else {
        yield copyFilesFolders(inputDir, output, external, dist);
      }
    } catch (error) {
      logger('warn', "Unable to copy external data with error:\n" + error);
    }
  });

  return function copyExternal(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

export default copyExternal;