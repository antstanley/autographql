import copyResolvers from './copyResolvers';
import prepareDeploy from './prepareDeploy';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { logger } from '../../../utils';
import setTemplateLocation from './setTemplateLocation';

var createFunction = (_ref) => {
  var {
    root,
    schema,
    resolvers,
    functionName,
    functionConfig,
    external
  } = _ref;

  try {
    var {
      provider
    } = functionConfig;
    var name = functionConfig.name ? functionConfig.name : functionName;
    var buildDestination = root + "/build/functions/" + provider;
    var functionLocation = buildDestination + "/" + name;
    var resolverLocation = functionLocation + "/resolvers"; // create function and resolvers folder

    mkdirSync(buildDestination);
    mkdirSync(functionLocation);
    mkdirSync(resolverLocation);
    logger('info', provider + " - " + name + ": Exporting resolvers"); // copy resolvers to resolver folder

    if (copyResolvers(resolverLocation, resolvers)) {
      // create function index.js and copy it
      var templateLocation = setTemplateLocation("../../../../template/functions/" + provider + "/index.template.mjs");
      var schemaFile = readFileSync(schema, 'utf-8');
      var functionTemplate = readFileSync(templateLocation, 'utf-8');
      var providerFunction = functionTemplate.replace(/__SDL__/g, schemaFile);

      if (!providerFunction) {
        throw new Error('Unable to inject schema into function');
      }

      logger('info', provider + " - " + name + ": Writing function");
      writeFileSync(functionLocation + "/index.mjs", providerFunction);
      prepareDeploy({
        name,
        functionName,
        functionLocation
      });
      return {
        name,
        provider,
        distName: root + "/dist/functions/" + provider,
        input: functionLocation + "/index.mjs",
        output: root + "/dist/functions/" + provider + "/" + name + "/",
        functionConfig,
        external
      };
    }
  } catch (error) {
    logger('error', "Unable to create function with Error: " + error);
    return null;
  }
};

export default createFunction;