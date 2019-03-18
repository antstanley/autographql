import { rollup } from 'rollup'
/*
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
*/
import fs from 'fs'
import { removeFolder, logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup(inputOptions)
  // generate code
  const { code } = await bundle.generate(outputOptions)
  fs.writeFileSync(`${outputOptions.dir}index.js`, code)

  return true
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

      /*
    const inputOptions = {
      input,
      plugins: [
        resolve({
          module: false,
          main: true,
          extensions: ['.mjs', '.js', '.json'],
          preferBuiltins: true
        }),
        json({
          preferConst: true
        }),
        commonjs(),
        babel({
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: '8'
                }
              }
            ]
          ],
          plugins: ['@babel/plugin-syntax-import-meta']
        })
      ],
      onwarn (warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }
        warn(warning)
      }
    }
    */
      const outputOptions = {
        format: 'cjs',
        file: 'index.js',
        dir: output
      }

      return build(inputOptions, outputOptions)
    } else {
      logger('error', 'Entry Point does not exist')
    }
  } catch (error) {
    logger('error', error.stack)
  }
}
