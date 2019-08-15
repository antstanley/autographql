function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { rollup } from 'rollup';
import { existsSync, lstatSync } from 'fs';
import { logger, rollupDefault } from '../../utils';

function build(_x, _x2, _x3) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (inputOptions, outputOptions, port) {
    try {
      // create a bundle
      var bundle = yield rollup(inputOptions); // generate code & write bundled code

      yield bundle.write(outputOptions);
      logger('info', "dev: http server ready on http://localhost:" + port);
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
  var _ref = _asyncToGenerator(function* (resolver, outputLoc, rollupConfig, port) {
    //  console.log(output)
    logger('info', "dev: Generating bundled resolver ...");

    try {
      var input = lstatSync(resolver).isFile() ? resolver : resolver + "/index.mjs"; // bundle

      if (existsSync(resolver)) {
        var inputOptions = yield rollupDefault(rollupConfig, input);
        var outputOptions = {
          format: 'cjs',
          file: outputLoc
        };
        return build(inputOptions, outputOptions, port);
      } else {
        logger('warn', "Path to " + resolver + " doesn't exit");
        return null;
      }
    } catch (error) {
      logger('error', "dev: Unable to bundle resolver with error. " + error);
    }
  });

  return function (_x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
})();