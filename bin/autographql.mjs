#!/usr/bin/env node --experimental-modules
'use strict'

import minimist from 'minimist'
import cli from '../lib/cli'
import * as pkg from '../package.json'
// import { readFileSync } from 'fs'

// const { version } = JSON.parse(readFileSync('../package.json', 'utf-8'))
const version = pkg.version
// const help = readFileSync('help.txt', 'utf-8')

const command = minimist(process.argv.slice(2))

if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
  // console.log(`\n${help.replace('__VERSION__', version)}\n`) // eslint-disable-line no-console
} else if (command.version) {
  console.log(`faasql v${version}`) // eslint-disable-line no-console
} else {
  cli(command)
}
