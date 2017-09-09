# git-unstaged

> 🎭 Get all unstaged git repos in a folder

[![Npm Version](https://img.shields.io/npm/v/git-unstaged.svg)](https://www.npmjs.com/package/git-unstaged)
[![Build Status](https://travis-ci.org/gabrielcsapo/git-unstaged.svg?branch=master)](https://travis-ci.org/gabrielcsapo/git-unstaged)
[![Coverage Status](https://node-coverage-server.herokuapp.com/badge/github%2Ecom/gabrielcsapo/git-unstaged.svg)](https://node-coverage-server.herokuapp.com/coverage/github%2Ecom/gabrielcsapo/git-unstaged)
[![Dependency Status](https://david-dm.org/gabrielcsapo/git-unstaged.svg)](https://david-dm.org/gabrielcsapo/git-unstaged)
[![devDependency Status](https://david-dm.org/gabrielcsapo/git-unstaged/dev-status.svg)](https://david-dm.org/gabrielcsapo/git-unstaged#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/git-unstaged.svg)]()
[![npm](https://img.shields.io/npm/dm/git-unstaged.svg)]()

## Installation

```
npm install git-unstaged
```

## Usage

```
Usage: git-unstaged [options]

Options:

-h, --help           output usage information
-V, --version        output the version number
-d, --depth [value]  the specified depth you want to recursively search for github repos
-a, --all            show all git repos and their status
```

## Example

```
$git-unstaged --depth=2

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
$git unstaged --depth=2

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
