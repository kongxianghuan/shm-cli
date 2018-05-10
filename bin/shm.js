#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const pkg = require('../package.json')
const chalk = require('chalk')

program
  .version(pkg.version)
  .command('dev', chalk.yellow('run on devolement mode'))
  .command('build', chalk.yellow('prod build'))

program.parse(process.argv)

if (!program.runningCommand) {
  console.log(chalk.red(`  Unknow command: ${program.args.join(' ')}`))
}