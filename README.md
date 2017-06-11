# git-unstaged

> Get all unstaged git repos in a folder

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
