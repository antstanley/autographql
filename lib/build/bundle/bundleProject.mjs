function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { rollup } from 'rollup';
import fs from 'fs';
import path from 'path';
import { removeFolder, logger, rollupDefault } from '../../utils';

function build(_x, _x2) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (inputOptions, outputOptions) {
    try {
      // create a bundle
      var bundle = yield rollup(inputOptions); // generate code
      // write bundled code

      yield bundle.write(outputOptions);
      return true;
    } catch (error) {
      logger('error', "bundleProject/build: " + error);
      return false;
    }
  });
  return _build.apply(this, arguments);
}

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(function* (_ref, rollupConfig) {
    var {
      provider,
      name,
      distName,
      input,
      output
    } = _ref;
    //  console.log(output)
    logger('info', provider + " - " + name + ": Generating bundled function");

    try {
      if (removeFolder(distName)) {
        fs.mkdirSync(distName);
        fs.mkdirSync(output);
      }

      if (fs.existsSync(input)) {
        // bundle
        var inputOptions = yield rollupDefault(rollupConfig, input);
        var outputOptions = {
          format: 'cjs',
          file: path.join(output, 'index.js')
        };
        return build(inputOptions, outputOptions);
      } else {
        logger('error', 'Entry Point does not exist');
      }
    } catch (error) {
      logger('error', "bundleProject: " + error);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();