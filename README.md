# git-unstaged

> 🎭 Get all unstaged git repos in a folder

[![Npm Version](https://img.shields.io/npm/v/git-unstaged.svg)](https://www.npmjs.com/package/git-unstaged)
[![Build Status](https://travis-ci.org/gabrielcsapo/git-unstaged.svg?branch=master)](https://travis-ci.org/gabrielcsapo/git-unstaged)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/git-unstaged.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/git-unstaged)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-unstaged/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-unstaged)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-unstaged/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-unstaged#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/git-unstaged.svg)]()
[![npm](https://img.shields.io/npm/dm/git-unstaged.svg)]()

## Installation

```
npm install git-unstaged -g
```

## Usage

```
Usage: git-unstaged [options]

Key:

  M -> modified
  A  -> added
  D -> deleted
  R -> renamed
  C -> copied
  ?? -> untracked

Commands:
  -h, --help, help                Output usage information
  -v, --version, version          Output the version number

Options:
  -b, --baseDirectory [path]      The base directory where operations should start from
  -d, --depth [value]             The specified depth you want to recursively search for git repos
  -a, --all                       Show all git repos and their status
```

## Example

```
$git-unstaged --depth 2

/Users/gabrielcsapo/Documents/espyjs
## wip
 M index.js
 D npm-debug.log
 M package.json

/Users/gabrielcsapo/Documents/git-unstaged
## master...origin/master
 M CHANGELOG.md
 M README.md
 M package.json
?? .eslintignore
?? .eslintrc
?? bin/
?? lib/
```

> Since git allows the execution of non [builtin](https://github.com/git/git/blob/master/git.c#L528) methods another way to run this command would be

```
$git unstaged --depth 2

/Users/gabrielcsapo/Documents/espyjs
## wip
 M index.js
 D npm-debug.log
 M package.json

/Users/gabrielcsapo/Documents/git-unstaged
## master...origin/master
 M CHANGELOG.md
 M README.md
 M package.json
?? .eslintignore
?? .eslintrc
?? bin/
?? lib/
```
