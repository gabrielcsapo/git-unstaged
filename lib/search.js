const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;

function getContents(directory) {
    try {
        const git = fs.statSync(path.resolve(directory, '.git'));
        if(git.isDirectory()) {
            return exec(' git status --porcelain --branch', {
                cwd: path.resolve(directory)
            }).toString('utf8');
        }
    } catch(ex) {
        // noop
    }
}

function getDirectories(directory) {
    return fs.readdirSync(directory)
        .filter((dir) => fs.statSync(path.resolve(directory, dir)).isDirectory())
        .map((dir) => path.resolve(directory, dir));
}

function search(directory, depth, callback) {
    const output = {};

    const found = [[directory]];

    for(var i = 0; i <= depth; i++) {
        found[i].forEach((dir) => {
            if(i < depth) {
                found.push(getDirectories(dir));
            }
        });
    }

    const directories = [].concat.apply([], found);

    directories.forEach((dir) => {
        const contents = getContents(path.resolve(directory, dir));
        if(contents) {
            output[path.resolve(directory, dir)] = contents;
        }
    });
    callback(output);
}

module.exports =  {
    search,
    getContents
};
