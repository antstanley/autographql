"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

const validateCLI = async (resolvers, schema, providers) => {
  if (schema) {
    if (!(0, _fs.existsSync)(schema)) {
      throw new Error(`Schema location: ${schema} does not exist`);
    }
  }

  if (resolvers) {
    if (!(0, _fs.existsSync)(resolvers)) {
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
};

var _default = validateCLI;
exports.default = _default;