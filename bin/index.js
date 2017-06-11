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
                    return log(chalk.gray(value))
                }
            });
        }
    });
});
