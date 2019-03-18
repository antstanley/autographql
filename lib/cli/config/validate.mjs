function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { existsSync } from 'fs';

const validateCLI =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (resolvers, schema, providers) {
    if (schema) {
      if (!existsSync(schema)) {
        throw new Error(`Schema location: ${schema} does not exist`);
      }
    }

    if (resolvers) {
      if (!existsSync(resolvers)) {
        throw new Error(`Resolvers location: ${resolvers} does not exist`);
      }
    }

    if (providers) {
      if (Array.isArray(providers)) {
        const supportedProviders = ['azure', 'ibm', 'aws', 'gcp', 'now'];

        for (let i = 0; i < providers.length; i++) {
          const providerName = providers[i];

          if (!supportedProviders.includes(providerName)) {
            throw new Error(`${providerName} is not a supported provider`);
          }
        }
      } else {
        throw new Error('No provider specified');
      }
    }

    return true;
  });

  return function validateCLI(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

export default validateCLI;