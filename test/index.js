const test = require('tape');
const path = require('path');
const exec = require('child_process').exec;

const { search, getDirectories, getContents } = require('../lib/search');

const fixturesDirectory = path.resolve(__dirname, 'fixtures');

test('git-unstaged', (t) => {
    t.plan(3);

    t.test('runs search in new directory', (t) => {
        exec('mkdir test1 && cd test1 && git init && cat "hello world" > t.txt', {
            cwd: fixturesDirectory
        });
        setTimeout(() => {
          search(fixturesDirectory, 1, (c) => {
              t.equal(c[path.resolve(fixturesDirectory, 'test1')], "## Initial commit on master\n?? t.txt\n");
              exec('rm -r ' + path.resolve(__dirname, 'fixtures', 'test1'), () => {
                  t.end();
              });
          });
        }, 1000);
    });

    t.test('runs getContents in new directory', (t) => {
        exec('mkdir test1 && cd test1 && git init && cat "hello world" > t.txt', {
            cwd: fixturesDirectory
        });
        setTimeout(() => {
          const contents = getContents(path.resolve(fixturesDirectory, 'test1'));
          t.equal(contents, '## Initial commit on master\n?? t.txt\n')
          exec('rm -r ' + path.resolve(__dirname, 'fixtures', 'test1'), () => {
              t.end();
          });
        }, 1000);
    });

    t.test('return fixtures directory', (t) => {
      const directories = getDirectories(__dirname);
      t.equal(directories.length, 1);
      t.equal(directories[0].substring(directories[0].lastIndexOf('/') + 1, directories[0].length), 'fixtures');
      t.end();
    });

});
