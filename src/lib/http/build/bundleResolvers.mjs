import { rollup } from 'rollup'
import { existsSync, lstatSync } from 'fs'
import { logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions, port) {
  try {
    // create a bundle
    const bundle = await rollup(inputOptions)
    // generate code & write bundled code
    await bundle.write(outputOptions)
    logger('info', `dev: http server ready on http://localhost:${port}`)
    return true
  } catch (error) {
    logger('error', `bundleProject/build: ${error}`)
    return false
  }
}

export default async (resolver, outputLoc, rollupConfig, port) => {
  //  console.log(output)
  logger('info', `dev: Generating bundled resolver ...`)
  try {
    const input = lstatSync(resolver).isFile()
      ? resolver
      : `${resolver}/index.mjs`
    // bundle
    if (existsSync(resolver)) {
      const inputOptions = await rollupDefault(rollupConfig, input)

      const outputOptions = {
        format: 'cjs',
        file: outputLoc
      }

      return build(inputOptions, outputOptions, port)
    } else {
      logger('warn', `Path to ${resolver} doesn't exit`)
      return null
    }
  } catch (error) {
    logger('error', `dev: Unable to bundle resolver with error. ${error}`)
  }
}
