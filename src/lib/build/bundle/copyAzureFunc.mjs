import { copyFileSync, lstatSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import { logger } from '../../utils'
import setDistDir from './setDestDir'
import mkdirp from 'mkdirp'

const setHostOptions = hostOpts => {
  const hostDefault = {
    version: '2.0',
    functionTimeout: '00:05:00',
    http: {
      routePrefix: '',
      maxOutstandingRequests: 200,
      maxConcurrentRequests: 100,
      dynamicThrottlesEnabled: true
    }
  }
  let returnOpts = hostDefault
  if (hostOpts) {
    if (typeof hostOpts === 'object') {
      returnOpts = Object.assign(hostDefault, hostOpts)
    } else {
      logger(
        'warn',
        'host options are not a valid JSON object, using default options. Refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-host-json for valid syntax'
      )
    }
  }
  return returnOpts
}

const setFuncOptions = funcOpts => {
  const funcDefault = {
    bindings: [
      {
        type: 'httpTrigger',
        direction: 'in',
        authLevel: 'anonymous',
        name: 'req',
        methods: ['get', 'post']
      },
      {
        type: 'http',
        direction: 'out',
        name: 'res'
      }
    ]
  }

  let returnOpts = funcDefault
  if (funcOpts) {
    if (typeof funcOpts === 'object') {
      returnOpts = Object.assign(funcDefault, funcOpts)
    } else {
      logger(
        'warn',
        'function options are not a valid JSON object, using default options. Refer to https://github.com/Azure/azure-functions-host/wiki/function.json for valid syntax'
      )
    }
  }
  return returnOpts
}

const copyFunc = async ({ output, functionConfig, provider, name }) => {
  try {
    logger(
      'info',
      `${provider} - ${name}: Copying function to distribution folder '${
        functionConfig.dist
      }'`
    )
    const { dist, host, func } = functionConfig
    const fileDestDir = join(setDistDir(dist), name)
    const fileDest = join(fileDestDir, 'index.js')
    const fileSrc = join(output, 'index.js')

    const hostOpts = setHostOptions(host)
    const funcOpts = setFuncOptions(func)

    if (existsSync(fileDestDir)) {
      if (lstatSync(fileDestDir).isDirectory()) {
        copyFileSync(fileSrc, fileDest)
        writeFileSync(
          join(fileDestDir, '../host.json'),
          JSON.stringify(hostOpts)
        )
        writeFileSync(
          join(fileDestDir, 'function.json'),
          JSON.stringify(funcOpts)
        )
        return true
      } else {
        logger(
          'warn',
          `Provider distribution location '${fileDestDir}' is not a directory`
        )
        return false
      }
    } else {
      mkdirp.sync(fileDestDir)
      copyFileSync(fileSrc, fileDest)
      writeFileSync(join(fileDestDir, '../host.json'), JSON.stringify(hostOpts))
      writeFileSync(
        join(fileDestDir, 'function.json'),
        JSON.stringify(funcOpts)
      )
      return true
    }
  } catch (error) {
    logger(
      'warn',
      `${provider} - ${name}: Unable to copy function to location with error: ${error}`
    )
    return false
  }
}

export default copyFunc
