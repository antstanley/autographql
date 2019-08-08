import { rollup } from 'rollup'
import fs from 'fs'
import path from 'path'
import { removeFolder, logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions) {
  try {
    // create a bundle
    const bundle = await rollup(inputOptions)
    // generate code
    // write bundled code
    await bundle.write(outputOptions)

    return true
  } catch (error) {
    logger('error', `bundleProject/build: ${error}`)
    return false
  }
}

export default async (
  { provider, name, distName, input, output },
  rollupConfig
) => {
  //  console.log(output)
  logger('info', `${provider} - ${name}: Generating bundled function`)

  try {
    if (removeFolder(distName)) {
      fs.mkdirSync(distName)
      fs.mkdirSync(output)
    }

    if (fs.existsSync(input)) {
      // bundle

      const inputOptions = await rollupDefault(rollupConfig, input)

      const outputOptions = {
        format: 'cjs',
        file: path.join(output, 'index.js')
      }

      return build(inputOptions, outputOptions)
    } else {
      logger('error', 'Entry Point does not exist')
    }
  } catch (error) {
    logger('error', `bundleProject: ${error}`)
  }
}
