import readline from 'readline'
import { dirname, basename } from 'path'
import chalk from 'chalk'

const prompt = () => {
  const currentDir = basename(dirname(process.cwd()))

  let initOptions = {
    name: currentDir,
    resolvers: './src/resolvers',
    schema: './src/schema/schema.gql',
    providers: ['aws', 'azure', 'gcp', 'ibm', 'netlify', 'now']
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(`Project Name (${currentDir}): `, answer => {
    // console.log(answer)
    if (answer.length > 0) {
      initOptions.name = answer
    }
    console.log(
      `${chalk.white(`Set to:`)} ${chalk.yellowBright(initOptions.name)}`
    )

    rl.question(`Resolvers Location (${initOptions.resolvers}): `, answer => {
      if (answer.length > 0) {
        initOptions.resolvers = answer
      }
      console.log(
        `${chalk.white(`Set to:`)} ${chalk.yellowBright(initOptions.resolvers)}`
      )
      rl.question(`Schema Location (${initOptions.schema}): `, answer => {
        if (answer.length > 0) {
          initOptions.schema = answer
        }
        console.log(
          `${chalk.white(`Set to:`)} ${chalk.yellowBright(initOptions.schema)}`
        )
        rl.question(
          `Which providers do you want target [aws,azure,gcp,ibm,netlify,now]?`,
          answer => {
            if (answer.length > 0) {
              initOptions.providers = answer.split(',')
            }
            console.log(
              `${chalk.white(`Set to:`)} ${chalk.yellowBright(
                initOptions.providers
              )}`
            )
            rl.close()
          }
        )
      })
    })
  })
}

export default prompt
