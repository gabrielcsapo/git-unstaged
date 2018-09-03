const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const childProcess = require('child_process')
const { promisify } = require('util')
const debug = require('debug')

const exec = promisify(childProcess.exec)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

async function getContents (directory) {
  try {
    const git = await stat(path.resolve(directory, '.git'))

    if (git.isDirectory()) {
      const { stdout } = await exec('git status --porcelain --branch', {
        cwd: path.resolve(directory)
      })
      return stdout
    }
  } catch (ex) {
    debug('failed to get git output', ex)
  }
}

async function getDirectories (directory) {
  const found = []

  try {
    const files = await readdir(directory)

    for (const file of files) {
      const dir = await stat(path.resolve(directory, file))
      if (dir.isDirectory()) {
        found.push(path.resolve(directory, file))
      }
    }
  } catch (ex) {
    debug('failed to parse directory', ex)
  }

  return found
}

function colorize (line) {
  // 'M' -> 'modified'
  // 'A ' -> 'added'
  // 'D' -> 'deleted'
  // 'R' -> 'renamed'
  // 'C' -> 'copied'
  // '??' -> 'untracked'

  switch (line.substring(0, 2).trim()) {
    case 'M':
      return chalk.red(line)
    case 'A':
      return chalk.green(line)
    case 'C':
      return chalk.yellow(line)
    case 'R':
      return chalk.magenta(line)
    case 'D':
      return chalk.bgRed.white(line)
    case '??':
      return chalk.gray(line)
    default:
      return chalk.white(line)
  }
}

module.exports = {
  colorize,
  getContents,
  getDirectories
}
