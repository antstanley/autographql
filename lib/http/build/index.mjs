import { mkdirSync, copyFileSync } from 'fs';
import { logger } from '../../utils';
import bundleResolvers from './bundleResolvers';
import prepare from './prepare';
import copyExternal from './copyExternal';

const buildHttp = (_ref) => {
  let root = _ref.root,
      schema = _ref.schema,
      resolvers = _ref.resolvers,
      external = _ref.external;

  try {
    const buildDestination = root.endsWith('/') ? `${root}http` : `${root}/http`;
    const resolverDest = `${buildDestination}/resolvers`;

    if (prepare(root)) {
      mkdirSync(resolverDest);
      logger('info', `dev: Exporting schema`);
      const schemaLoc = `${buildDestination}/schema.gql`;
      copyFileSync(schema, schemaLoc);
      logger('info', `dev: Exporting resolver`);
      const resolverLoc = `${resolverDest}/index.js`;

      if (bundleResolvers(resolvers, resolverLoc)) {
        if (external) {
          copyExternal({
            external,
            output: resolverDest,
            input: resolvers
          });
        }

        return {
          schemaLoc,
          resolverLoc
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    logger('error', `Unable to build http server with error: \n${error}`);
    return null;
  }
};

export default buildHttp;