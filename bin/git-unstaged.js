#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const { search } = require('../lib/search')
const { colorize } = require('../lib/utils')

const log = console.log; // eslint-disable-line

const args = process.argv.slice(2)
let program = {}

args.forEach((arg, i) => {
  switch (arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0)
    case '-h':
    case '--help':
    case 'help':
      console.log(`` + // eslint-disable-line
        `
Usage: git-unstaged [options]

Key:

  ${colorize('M -> modified')}
  ${colorize('A  -> added')}
  ${colorize('D -> deleted')}
  ${colorize('R -> renamed')}
  ${colorize('C -> copied')}
  ${colorize('?? -> untracked')}

Commands:
  -h, --help, help                Output usage information
  -v, --version, version          Output the version number

Options:
  -b, --baseDirectory [path]      The base directory where operations should start from
  -d, --depth [value]             The specified depth you want to recursively search for git repos
  -a, --all                       Show all git repos and their status
`)
      process.exit(0)
    case '-d':
    case '--depth':
      program['depth'] = args[i + 1]
      break
    case '-di':
    case '--directory':
      program['directory'] = path.resolve(process.cwd(), args[i + 1])
      break
  }
})

const { depth = 0, all = true } = program;

(async function () {
  const output = await search(process.cwd(), depth)

  Object.keys(output).forEach((repo) => {
    const lines = output[repo].split('\n')

    if (all && lines.length <= 2) {
      log(chalk.white.underline(repo))
      log(output[repo])
    } else if (lines.length > 2) {
      log(chalk.white.underline(repo))
      lines.forEach((value, index) => {
        if (index === 0) {
          return log(chalk.white(value))
        } else {
          return log(colorize(value))
        }
      })
    }
  })
}())
