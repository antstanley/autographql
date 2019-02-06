"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const _require = require('graphql'),
      graphql = _require.graphql,
      buildSchema = _require.buildSchema;

const fs = require('fs');

const _require2 = require('../utils'),
      logger = _require2.logger;

const handler = async (params, resolvers, schema) => {
  try {
    const query = params.query,
          variables = params.variables;

    if (!query) {
      const response = 'No query specified';
      logger('warn', `dev: ${response}`);
      return response;
    } else {
      const gqlSchema = await buildSchema(fs.readFileSync(schema, 'utf-8'));
      const context = null;

      const resolverModule = require(resolvers);

      const response = await graphql(gqlSchema, query, resolverModule, context, variables);

      if (response.errors) {
        logger('warn', `query error response:\n${JSON.stringify(response, null, 2)}`);
      }

      return JSON.stringify(response);
    }
  } catch (error) {
    logger('error', `Unable to process GraphQL Query with error:\n${error}`);
    return {
      error
    };
  }
};

var _default = handler;
exports.default = _default;