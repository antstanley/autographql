function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import httpServer from './httpServer';
import { logger } from '../utils';
import buildHttp from './build';

const initHttpServer =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (options) {
    try {
      const root = options.root,
            resolvers = options.resolvers,
            schema = options.schema,
            dev = options.dev,
            external = options.external;
      const port = dev ? dev.port ? dev.port : 7000 : 7000;
      logger('info', 'dev: starting http server');

      const _buildHttp = buildHttp({
        root,
        schema,
        resolvers,
        external
      }),
            resolverLoc = _buildHttp.resolverLoc,
            schemaLoc = _buildHttp.schemaLoc;

      if (resolverLoc && schemaLoc) {
        if (httpServer(port, resolverLoc, schemaLoc)) {
          logger('info', "dev: http server starting at http://localhost:" + port);
        } else {
          logger('warn', 'dev: Unable to start http server');
        }
      } else {
        logger('warn', "dev: Unable to bundle schema & resolvers\n schema: " + schemaLoc + "\nresolver:" + resolverLoc);
      }
    } catch (error) {
      logger('error', "Unable to init http server with error:\n " + error);
    }
  });

  return function initHttpServer(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default initHttpServer;