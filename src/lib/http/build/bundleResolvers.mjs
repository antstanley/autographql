import { rollup } from 'rollup'
import { existsSync, writeFileSync } from 'fs'
import { logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions, outputLoc) {
  // create a bundle
  try {
    const bundle = await rollup(inputOptions)
    const { code } = await bundle.generate(outputOptions)
    writeFileSync(outputLoc, code)
    logger('info', `dev: http server ready!`)
  } catch (error) {
    logger('error', `dev: function bundle failed with error: ${error}`)
  }
  return true
}

export default async (resolver, outputLoc, rollupConfig) => {
  //  console.log(output)
  logger('info', `dev: Generating bundled resolver ...`)
  try {
    const input = `${resolver}/index.mjs`
    // bundle
    if (existsSync(resolver)) {
      const inputOptions = await rollupDefault(rollupConfig, input)

      const outputOptions = {
        format: 'cjs'
      }

      return build(inputOptions, outputOptions, outputLoc)
    } else {
      logger('warn', `Path to ${resolver} doesn't exit`)
      return null
    }
  } catch (error) {
    logger('error', `dev: Unable to bundle resolver with error. ${error}`)
  }
}
