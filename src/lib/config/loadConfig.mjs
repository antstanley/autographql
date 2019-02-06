import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { logger } from '../utils'
import YAML from 'yaml'
import setProjectRoot from './setProjectRoot'

const projectRoot = setProjectRoot()

const loadDefault = () => {
  if (existsSync(join(projectRoot, './faasql.config.json'))) {
    return JSON.parse(
      readFileSync(join(projectRoot, './faasql.config.json'), 'utf-8')
    )
  } else {
    if (existsSync(join(projectRoot, './faasql.config.yml'))) {
      return YAML.parse(
        readFileSync(join(projectRoot, './faasql.config.yml'), 'utf-8')
      )
    } else {
      logger(
        'warn',
        'No faasql.config.json or faasql.config.yml found, using defaults.'
      )
      return null
    }
  }
}
const checkExtension = filename => {
  if (filename.includes('.yml')) {
    return 'YAML'
  } else {
    if (filename.includes('.json')) {
      return 'JSON'
    } else {
      logger(
        'warn',
        'Incorrect file type specified. Please use a .json or .yml file. Using defaults'
      )
      return null
    }
  }
}

const loadConfig = configFile => {
  if (configFile) {
    const fullFileName = join(projectRoot, configFile)

    if (existsSync(fullFileName)) {
      const fileExt = checkExtension(configFile)

      if (fileExt === 'YAML') {
        return YAML.parse(readFileSync(fullFileName, 'utf-8'))
      } else {
        if (fileExt === 'JSON') {
          return JSON.parse(readFileSync(fullFileName, 'utf-8'))
        } else {
          return null
        }
      }
    } else {
      logger(
        'warn',
        'Config file specified does not exist, searching default config location.'
      )
      return loadDefault()
    }
  } else {
    return loadDefault()
  }
}

export default loadConfig
