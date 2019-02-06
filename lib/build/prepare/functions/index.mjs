import copyResolvers from './copyResolvers';
import prepareDeploy from './prepareDeploy';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { logger } from '../../../utils';
import setTemplateLocation from './setTemplateLocation';

const createFunction = (_ref) => {
  let root = _ref.root,
      schema = _ref.schema,
      resolvers = _ref.resolvers,
      functionName = _ref.functionName,
      provider = _ref.provider,
      external = _ref.external;

  try {
    const name = provider.name;
    const buildDestination = `${root}/build/functions/${name}`;
    const functionLocation = `${buildDestination}/${functionName}`;
    const resolverLocation = `${functionLocation}/resolvers`; // create function and resolvers folder

    mkdirSync(buildDestination);
    mkdirSync(functionLocation);
    mkdirSync(resolverLocation);
    logger('info', `${name}: Exporting resolvers`); // copy resolvers to resolver folder

    if (copyResolvers(resolverLocation, resolvers)) {
      // create function index.js and copy it
      // check if you need to create an Azure function app
      if (name !== 'azure') {
        const templateLocation = setTemplateLocation(`../../../../template/functions/${name}/index.template.mjs`);
        const schemaFile = readFileSync(schema, 'utf-8');
        const functionTemplate = readFileSync(templateLocation, 'utf-8');
        const providerFunction = functionTemplate.replace(/__SDL__/g, schemaFile);

        if (!providerFunction) {
          throw new Error('Unable to inject schema into function');
        }

        logger('info', `${name}: Writing function`);
        writeFileSync(`${functionLocation}/index.mjs`, providerFunction);
        prepareDeploy({
          name,
          functionName,
          functionLocation
        });
        return {
          name,
          distName: `${root}/dist/functions/${name}`,
          input: `${functionLocation}/index.mjs`,
          output: `${root}/dist/functions/${name}/${functionName}/`,
          provider,
          external
        };
      }
    }
  } catch (error) {
    logger('error', `Unable to create function with Error: ${error}`);
    return null;
  }
};

export default createFunction;