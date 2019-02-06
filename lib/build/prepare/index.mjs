import createFunction from './functions';
import createStructure from './createStructure';

const prepare = async (_ref) => {
  let root = _ref.root,
      schema = _ref.schema,
      resolvers = _ref.resolvers,
      name = _ref.name,
      providers = _ref.providers,
      external = _ref.external;

  try {
    let functions = [];

    if (createStructure(root)) {
      providers.forEach(provider => {
        functions.push(createFunction({
          root,
          schema,
          resolvers,
          functionName: name,
          provider,
          external
        }));
      });
    }

    return functions;
  } catch (error) {
    throw new Error(error);
  }
};

export default prepare;