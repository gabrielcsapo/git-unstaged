#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const search = require('../lib/search').search;
const log = console.log; // eslint-disable-line

program
  .version(require('../package.json').version)
  .option('-d, --depth [value]', 'the specified depth you want to recursively search for github repos', 1)
  .option('-a, --all', 'show all git repos and their status', false)
  .parse(process.argv);

search(process.cwd(), program.depth, (output) => {
    Object.keys(output).forEach((repo) => {
        const lines = output[repo].split('\n');

        if(program.all && lines.length <= 2) {
            log(chalk.white.underline(repo));
            log(output[repo]);
        } else if(lines.length > 2) {
            log(chalk.white.underline(repo))
            lines.forEach((value, index) => {
                if(index == 0) {
                    return log(chalk.white(value))
                } else {
                    // 'M' -> 'modified'
                    // 'A ' -> 'added'
                    // 'D' -> 'deleted'
                    // 'R' -> 'renamed'
                    // 'C' -> 'copied'
                    // '??' -> 'untracked'

                    switch(value.substring(0, 2).trim()) {
                        case 'M':
                            return log(chalk.red(value))
                        case 'A':
                            return log(chalk.green(value))
                        case 'C':
                            return log(chalk.yellow(value))
                        case 'R':
                            return log(chalk.magenta(value))
                        case 'D':
                            return log(chalk.bgRed.white(value))
                        case '??':
                            return log(chalk.gray(value))
                        default:
                            return log(chalk.white(value))
                    }
                }
            });
        }
    });
});
