"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

var _prepare = _interopRequireDefault(require("./prepare"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateProviders = providers => {
  const availableProviders = ['aws', 'azure', 'gcp', 'ibm', 'netlify', 'now'];
  const validatedProviders = providers.filter(provider => {
    if (!availableProviders.includes(provider)) {
      (0, _utils.logger)('warning', `init: ${provider} is not a valid provider`);
      return false;
    } else {
      return true;
    }
  });

  if (validatedProviders.length > 0) {
    return validatedProviders;
  } else {
    (0, _utils.logger)('warning', `init: no valid providers specified, setting to all providers`);
    return availableProviders;
  }
};

const setFunctions = providers => {
  let functions = [];
  providers.forEach(element => {
    functions.push({
      provider: element
    });
  });
  return functions;
};

const prompt = () => {
  try {
    const currentDir = (0, _path.basename)(process.cwd());
    let initOptions = {
      name: currentDir,
      resolvers: './src/resolvers',
      schema: './src/schema/schema.gql',
      providers: ['aws', 'azure', 'gcp', 'ibm', 'netlify', 'now'],
      functions: []
    };
    let configFile = 'autographql.config.json';
    console.log(_chalk.default.blueBright('********************************************************************************'));
    console.log(_chalk.default.blueBright('****                        Init AutoGraphQL Project                        ****'));
    console.log(_chalk.default.blueBright('****                                                                        ****'));
    console.log(_chalk.default.blueBright('****       The framework to rapidly develop GraphQL backend services        ****'));
    console.log(_chalk.default.blueBright('********************************************************************************'));

    const rl = _readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Project Name (${currentDir}): `, answer => {
      if (answer.length > 0) {
        initOptions.name = answer;
      }

      rl.question(`Resolvers Location (${initOptions.resolvers}): `, answer => {
        if (answer.length > 0) {
          initOptions.resolvers = answer;
        }

        rl.question(`Schema Location (${initOptions.schema}): `, answer => {
          if (answer.length > 0) {
            initOptions.schema = answer;
          }

          rl.question(`Which providers do you want target (aws,azure,gcp,ibm,netlify,now)?`, answer => {
            if (answer.length > 0) {
              initOptions.providers = validateProviders(answer.split(','));
            }

            rl.question(`What do you want to name the config file (autographql.config.json)?`, answer => {
              if (answer.length > 0) {
                configFile = answer;
              }

              console.log('AutoGraphQL Configuration:');
              console.log(_chalk.default.gray('Project Name: '), _chalk.default.yellowBright(initOptions.name));
              console.log(_chalk.default.gray('Resolver Location: '), _chalk.default.yellowBright(initOptions.resolvers));
              console.log(_chalk.default.gray('Schema File: '), _chalk.default.yellowBright(initOptions.schema));
              console.log(_chalk.default.gray('Cloud Providers: '), _chalk.default.yellowBright(initOptions.providers));
              console.log(_chalk.default.gray('Configuration File: '), _chalk.default.yellowBright(configFile));
              rl.question(`Do you want to create a project with this configuration (Y/n)?`, answer => {
                if (answer.length > 0) {
                  if (answer === 'y' | answer === 'Y') {
                    initOptions.functions = setFunctions(initOptions.providers);
                    delete initOptions.providers;
                    (0, _prepare.default)({
                      options: initOptions,
                      configFile
                    });
                  } else {
                    initOptions = null;
                  }
                } else {
                  initOptions.functions = setFunctions(initOptions.providers);
                  delete initOptions.providers;
                  (0, _prepare.default)({
                    options: initOptions,
                    configFile
                  });
                }

                rl.close();
              });
            });
          });
        });
      });
      return true;
    });
  } catch (error) {
    (0, _utils.logger)('error', `Initialisation aborted with errror: ${error}`);
    return false;
  }
};

var _default = prompt;
exports.default = _default;