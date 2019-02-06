#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const cli = require('../lib/cli')
const pkg = require('../package.json')
const version = pkg.version

const command = minimist(process.argv.slice(2))

if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
  // console.log(`\n${help.replace('__VERSION__', version)}\n`)
} else if (command.version) {
  console.log(`faasql v${version}`)
} else {
  cli.default(command)
}
