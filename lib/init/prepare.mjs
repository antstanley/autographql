function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { logger } from '../utils';
import { writeFileSync, existsSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname, join } from 'path';

var initConfig =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      options,
      configFile
    } = _ref;

    try {
      var {
        resolvers,
        schema
      } = options;
      var resolverDir = join(process.cwd(), resolvers);

      if (!existsSync(resolverDir)) {
        mkdirp(resolverDir);
        logger('info', "init: Resolver directory created");
      }

      if (existsSync(resolverDir)) {
        writeFileSync(join(resolverDir, 'index.js'), '');
      }

      var fullSchema = join(process.cwd(), schema);
      var schemaDir = dirname(fullSchema);

      if (!existsSync(schemaDir)) {
        mkdirp.sync(schemaDir);
        logger('info', "init: Schema directory created");
      }

      if (!existsSync(fullSchema)) {
        writeFileSync(fullSchema, '');
      }

      var fullConfig = join(process.cwd(), configFile);

      if (!existsSync(fullConfig)) {
        writeFileSync(fullConfig, JSON.stringify(options, null, 2));
      } else {
        logger('error', fullConfig + " already exists.");
      }

      logger('info', "Project config and scaffolding created.");
      return true;
    } catch (error) {
      logger('error', "init project error: " + error);
      return false;
    }
  });

  return function initConfig(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export default initConfig;