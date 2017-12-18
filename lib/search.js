const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { promisify } = require('util');

const exec = promisify(child_process.exec);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getContents(directory) {
  try {
    const git = await stat(path.resolve(directory, '.git'));
    if (git.isDirectory()) {
      const { stdout } = await exec('git status --porcelain --branch', {
        cwd: path.resolve(directory)
      });
      return stdout;
    }
  } catch (ex) {
    return;
  }
}

async function getDirectories(directory) {
  try {
    let found = [];
    const files = await readdir(directory);
    for(var i = 0; i < files.length; i++) {
      const dir = await stat(path.resolve(directory, files[i]));
      if(dir.isDirectory()) {
        found.push(path.resolve(directory, files[i]));
      }
    }
    return found;
  } catch(ex) {
    return [];
  }
}

async function search(directory, depth) {
  let found = [[directory]];
  let output = {};

  for (var i = 0; i <= depth; i++) {
    for (var s = 0; s <= found[i].length - 1; s++) {
      if (i < depth) {
        found.push(await getDirectories(found[i][s]));
      }
    }
  }

  let all = [].concat.apply([], found);
  for(var p = 0; p < all.length; p++) {
    const dir = all[p];
    const contents = await getContents(path.resolve(directory, dir));
    if (contents) {
      output[path.resolve(directory, dir)] = contents;
    }
  }

  return output;
}

module.exports = {
  search,
  getDirectories,
  getContents
};
