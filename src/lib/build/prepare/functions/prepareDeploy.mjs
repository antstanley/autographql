import yaml from 'yaml'
import { readFileSync, writeFileSync } from 'fs'
import setTemplateLocation from './setTemplateLocation'
// import { moduleRoot } from '../../../utils'

const prepareDeploy = ({ name, functionName, functionLocation }) => {
  try {
    const serverlessTemplateLocation = setTemplateLocation(
      `../../../../template/functions/${name}/serverless.yml`
    )

    const serverless = yaml.parse(
      readFileSync(serverlessTemplateLocation, 'utf-8')
    )

    if (serverless) {
      serverless.name = functionName

      writeFileSync(
        `${functionLocation}/serverless.yml`,
        yaml.stringify(serverless)
      )

      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export default prepareDeploy
