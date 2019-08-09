function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { mkdirSync, copyFileSync } from 'fs';
import { logger } from '../../utils';
import bundleResolvers from './bundleResolvers';
import prepare from './prepare';
import copyExternal from './copyExternal';

var getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

var buildHttp =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      root,
      schema,
      resolvers,
      external,
      rollup
    } = _ref;

    try {
      var buildDestination = root.endsWith('/') ? root + "http" : root + "/http";
      var resolverDest = buildDestination + "/resolvers";

      if (prepare(root)) {
        mkdirSync(resolverDest);
        logger('info', "dev: Exporting schema");
        var schemaLoc = buildDestination + "/schema.gql";
        copyFileSync(schema, schemaLoc);
        logger('info', "dev: Exporting resolver");
        var randomIdx = getRandomInt(9999);
        var resolverLoc = resolverDest + "/index" + randomIdx + ".js";
        var bundleResponse = yield bundleResolvers(resolvers, resolverLoc, rollup);

        if (bundleResponse) {
          if (external) {
            if (Array.isArray(external)) {
              if (external.length > 0) {
                yield copyExternal({
                  external,
                  output: resolverDest,
                  input: resolvers
                });
              }
            }
          }

          return {
            schemaLoc,
            resolverLoc
          };
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      logger('error', "Unable to build http server with error: \n" + error);
      return false;
    }
  });

  return function buildHttp(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export default buildHttp;