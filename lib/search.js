const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

function getContents(directory) {
    try {
        const git = fs.statSync(path.resolve(directory, '.git'));
        if(git.isDirectory()) {
            return execSync('git status --porcelain --branch', {
                cwd: path.resolve(directory)
            }).toString('utf8');
        }
    } catch(ex) {
      return;
    }
}

function getDirectories(directory) {
    return fs.readdirSync(directory)
        .filter((dir) => fs.statSync(path.resolve(directory, dir)).isDirectory())
        .map((dir) => path.resolve(directory, dir));
}

function search(directory, depth, callback) {
    let found = [[directory]];
    let output = {};

    for(var i = 0; i <= depth; i++) {
        found[i].forEach((dir) => {
            if(i < depth) {
                found.push(getDirectories(dir));
            }
        });
    }

    [].concat.apply([], found).forEach((dir) => {
        const contents = getContents(path.resolve(directory, dir));
        if(contents) {
            output[path.resolve(directory, dir)] = contents;
        }
    });
    callback(output);
}

module.exports =  {
    search,
    getDirectories,
    getContents
};
