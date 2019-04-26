function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { rollup } from 'rollup';
import { existsSync, writeFileSync } from 'fs';
import { logger, rollupDefault } from '../../utils';

function build(_x, _x2, _x3) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (inputOptions, outputOptions, outputLoc) {
    // create a bundle
    const bundle = yield rollup(inputOptions); // generate code

    const _ref2 = yield bundle.generate(outputOptions),
          code = _ref2.code; // logger(`warn`, `code: ${code}`)


    writeFileSync(outputLoc, code);
    logger('info', "dev: http server ready!");
    return true;
  });
  return _build.apply(this, arguments);
}

export default
/*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(function* (resolver, outputLoc, rollupConfig) {
    //  console.log(output)
    logger('info', "dev: Generating bundled resolver ...");
    const input = resolver + "/index.mjs"; // bundle

    if (existsSync(resolver)) {
      const inputOptions = yield rollupDefault(rollupConfig, input);
      /*
      const inputOptions = {
        input,
        plugins: [
          resolve({
            module: false,
            main: true,
            extensions: ['.mjs', '.js', '.json']
          }),
          commonjs(),
          json({
            preferConst: true
          }),
          babel({
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '8'
                  }
                }
              ]
            ],
            plugins: ['@babel/plugin-syntax-import-meta']
          })
        ]
      }
      */

      const outputOptions = {
        format: 'cjs'
      };
      return build(inputOptions, outputOptions, outputLoc);
    } else {
      logger('warn', "Path to " + resolver + " doesn't exit");
      return null;
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
})();