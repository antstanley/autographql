import { rollup } from 'rollup'
/*
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
*/
import { existsSync, writeFileSync } from 'fs'
import { logger, rollupDefault } from '../../utils'

async function build (inputOptions, outputOptions, outputLoc) {
  // create a bundle
  const bundle = await rollup(inputOptions)
  // generate code
  const { code } = await bundle.generate(outputOptions)
  // logger(`warn`, `code: ${code}`)
  writeFileSync(outputLoc, code)
  return true
}

export default async (resolver, outputLoc, rollupConfig) => {
  //  console.log(output)
  logger('info', `dev: Generating bundled resolver ...`)

  const input = `${resolver}/index.mjs`
  // bundle
  if (existsSync(resolver)) {
    const inputOptions = await rollupDefault(rollupConfig, input)

    /*
    const inputOptions = {
      input,
      plugins: [
        resolve({
          module: false,
          main: true,
          extensions: ['.mjs', '.js', '.json']
        }),
        commonjs(),
        json({
          preferConst: true
        }),
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
      ]
    }
    */

    const outputOptions = {
      format: 'cjs'
    }

    return build(inputOptions, outputOptions, outputLoc)
  } else {
    logger('warn', `Path to ${resolver} doesn't exit`)
    return null
  }
}
