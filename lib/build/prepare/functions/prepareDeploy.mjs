import yaml from 'yaml';
import { readFileSync, writeFileSync } from 'fs';
import setTemplateLocation from './setTemplateLocation'; // import { moduleRoot } from '../../../utils'

var prepareDeploy = (_ref) => {
  var {
    name,
    functionName,
    functionLocation
  } = _ref;

  try {
    var serverlessTemplateLocation = setTemplateLocation("../../../../template/functions/" + name + "/serverless.yml");
    var serverless = yaml.parse(readFileSync(serverlessTemplateLocation, 'utf-8'));

    if (serverless) {
      serverless.name = functionName;
      writeFileSync(functionLocation + "/serverless.yml", yaml.stringify(serverless));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default prepareDeploy;