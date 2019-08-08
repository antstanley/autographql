function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import bundleProject from './bundleProject';
import copyFunc from './copyFunc';
import copyAzureFunc from './copyAzureFunc';
import copyExternal from './copyExternal';
import { logger } from '../../utils';
import zipFunction from './zipFunction';

var bundleGraphQL =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (functionManifest, rollupConfig) {
    try {
      var manifest = functionManifest;
      var arrLength = manifest.length;

      for (var i = 0; i < arrLength; i++) {
        var options = manifest[i];
        var bundleSuccess = yield bundleProject(options, rollupConfig);

        if (bundleSuccess) {
          if (options.functionConfig) {
            var {
              input,
              output,
              functionConfig,
              external,
              provider,
              name
            } = options;
            var bundledFunction = false;

            if (functionConfig.dist) {
              if (functionConfig.provider === 'azure') {
                bundledFunction = yield copyAzureFunc({
                  functionConfig,
                  output,
                  provider,
                  name
                });
              } else {
                bundledFunction = yield copyFunc({
                  functionConfig,
                  output,
                  provider,
                  name
                });
              }
            }

            if (external) {
              yield copyExternal({
                provider,
                name,
                external,
                input,
                output,
                functionConfig
              });
            }

            var zipFunc = functionConfig.zip ? functionConfig.zip : false;

            if (bundledFunction && zipFunc) {
              yield zipFunction(functionConfig.dist, name, provider);
            }
          }
        }
      }
    } catch (error) {
      logger('error', error);
    }
  });

  return function bundleGraphQL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export default bundleGraphQL;