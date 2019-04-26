import { existsSync } from 'fs';

const validConfig = config => {
  if (!existsSync(config.schema)) {
    throw new Error("Schema file does not exist at location: " + config.schema);
  }

  if (!existsSync(config.resolvers)) {
    throw new Error("Resolvers do not exist at location: " + config.resolvers);
  }

  if (!config.name) {
    throw new Error("Function name not specified");
  }

  return config;
};

export default validConfig;