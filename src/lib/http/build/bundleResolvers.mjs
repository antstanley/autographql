import { rollup } from 'rollup'
import { existsSync, writeFileSync } from 'fs'
import { logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions, outputLoc) {
  // create a bundle
  const bundle = await rollup(inputOptions)
  // generate code
  const { code } = await bundle.generate(outputOptions)
  // logger(`warn`, `code: ${code}`)
  writeFileSync(outputLoc, code)
  logger('info', `dev: http server ready!`)
  return true
}

export default async (resolver, outputLoc, rollupConfig) => {
  //  console.log(output)
  logger('info', `dev: Generating bundled resolver ...`)

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
}
