import readline from 'readline'
import { basename } from 'path'
import chalk from 'chalk'
import { logger } from '../utils'

const validateProviders = providers => {
  const availableProviders = ['aws', 'azure', 'gcp', 'ibm', 'netlify', 'now']

  const validatedProviders = providers.filter(provider => {
    if (!availableProviders.includes(provider)) {
      logger('warning', `init: ${provider} is not a valid provider`)
      return false
    } else {
      return true
    }
  })

  if (validatedProviders.length > 0) {
    return validatedProviders
  } else {
    logger(
      'warning',
      `init: no valid providers specified, setting to all providers`
    )
    return availableProviders
  }
}

const setFunctions = providers => {
  let functions = []
  providers.forEach(element => {
    functions.push({ provider: element })
  })

  return functions
}

const prompt = async () => {
  try {
    const currentDir = basename(process.cwd())

    let initOptions = {
      name: currentDir,
      resolvers: './src/resolvers',
      schema: './src/schema/schema.gql',
      providers: ['aws', 'azure', 'gcp', 'ibm', 'netlify', 'now'],
      functions: []
    }

    let configFile = 'autographql.config.json'

    console.log(
      chalk.blueBright(
        '********************************************************************************'
      )
    )
    console.log(
      chalk.blueBright(
        '****                        Init AutoGraphQL Project                        ****'
      )
    )
    console.log(
      chalk.blueBright(
        '****                                                                        ****'
      )
    )
    console.log(
      chalk.blueBright(
        '****       The framework to rapidly develop GraphQL backend services        ****'
      )
    )
    console.log(
      chalk.blueBright(
        '********************************************************************************'
      )
    )

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question(`Project Name (${currentDir}): `, answer => {
      if (answer.length > 0) {
        initOptions.name = answer
      }
      rl.question(`Resolvers Location (${initOptions.resolvers}): `, answer => {
        if (answer.length > 0) {
          initOptions.resolvers = answer
        }
        rl.question(`Schema Location (${initOptions.schema}): `, answer => {
          if (answer.length > 0) {
            initOptions.schema = answer
          }
          rl.question(
            `Which providers do you want target (aws,azure,gcp,ibm,netlify,now)?`,
            answer => {
              if (answer.length > 0) {
                initOptions.providers = validateProviders(answer.split(','))
              }
              rl.question(
                `What do you want to name the config file (autographql.config.json)?`,
                answer => {
                  if (answer.length > 0) {
                    configFile = answer
                  }

                  console.log('AutoGraphQL Configuration:')
                  console.log(
                    chalk.gray('Project Name: '),
                    chalk.yellowBright(initOptions.name)
                  )
                  console.log(
                    chalk.gray('Resolver Location: '),
                    chalk.yellowBright(initOptions.resolvers)
                  )
                  console.log(
                    chalk.gray('Schema File: '),
                    chalk.yellowBright(initOptions.schema)
                  )
                  console.log(
                    chalk.gray('Cloud Providers: '),
                    chalk.yellowBright(initOptions.providers)
                  )
                  console.log(
                    chalk.gray('Configuration File: '),
                    chalk.yellowBright(configFile)
                  )

                  rl.question(
                    `Do you want to create a project with this configuration (Y/n)?`,
                    answer => {
                      if (answer.length > 0) {
                        if ((answer === 'y') | (answer === 'Y')) {
                          initOptions.functions = setFunctions(
                            initOptions.providers
                          )
                          delete initOptions.providers
                        } else {
                          initOptions = null
                        }
                      } else {
                        initOptions.functions = setFunctions(
                          initOptions.providers
                        )
                        delete initOptions.providers
                      }
                      rl.close()
                    }
                  )
                }
              )
            }
          )
        })
      })
    })

    return { options: initOptions, configFile }
  } catch (error) {
    logger('error', `Initialisation aborted with errror: ${error}`)
  }
}

export default prompt
