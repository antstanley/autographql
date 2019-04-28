function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { graphql, buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import { logger } from '../utils'; // import resolverFunc from '../../test/sample/resolvers'

const handler =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (params, resolvers, schema) {
    try {
      const query = params.query,
            variables = params.variables;

      if (!query) {
        const response = 'No query specified';
        logger('warn', "dev: " + response);
        return response;
      } else {
        logger('warn', "resolvers: " + resolvers + "\nschema:" + schema); // logger('warn', `query: ${query}\nvariables:${variables}`)

        const gqlSchema = yield buildSchema(readFileSync(schema, 'utf-8'));
        const importedModule = yield import(resolvers);
        const resolverModule = importedModule.default;
        const context = null;
        const response = yield graphql(gqlSchema, query, resolverModule, context, variables);

        if (response.errors) {
          logger('warn', "query error response:\n" + JSON.stringify(response, null, 2));
        }

        return JSON.stringify(response);
      }
    } catch (error) {
      logger('error', "Unable to process GraphQL Query with error:\n" + error);
      return {
        error
      };
    }
  });

  return function handler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

export default handler;