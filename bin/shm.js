#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const chalk = require('chalk')

program
  .version(pkg.version)
  .command('dev', 'run on development mode')
  .command('build', 'production build')

program.parse(process.argv)

if (!program.runningCommand) {
  console.log(chalk.red(`  Unknow command: ${program.args.join(' ')}`))
}