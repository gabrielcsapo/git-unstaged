const test = require('tape');
const path = require('path');
const { exec } = require('child_process');

const { search, getDirectories, getContents } = require('../lib/search');

const fixturesDirectory = path.resolve(__dirname, 'fixtures');

test('git-unstaged', (t) => {
  t.plan(3);

  t.test('runs search in new directory', (t) => {
    exec('mkdir test1 && cd test1 && git init && cat "hello world" > t.txt && sleep 1000', {
      cwd: fixturesDirectory
    }, async() => {
      const output = await search(fixturesDirectory, 1);
      t.equal(output[path.resolve(fixturesDirectory, 'test1')], '## No commits yet on master\n?? t.txt\n');
      exec('rm -r ' + path.resolve(__dirname, 'fixtures', 'test1'), () => {
        t.end();
      });
    });
  });

  t.test('runs getContents in new directory', (t) => {
    exec('mkdir test1 && cd test1 && git init && cat "hello world" > t.txt && sleep 1000', {
      cwd: fixturesDirectory
    }, async() => {
      const contents = await getContents(path.resolve(fixturesDirectory, 'test1'));
      t.equal(contents, '## No commits yet on master\n?? t.txt\n');
      exec('rm -r ' + path.resolve(__dirname, 'fixtures', 'test1'), () => {
        t.end();
      });
    });
  });

  t.test('return fixtures directory', async(t) => {
    const directories = await getDirectories(__dirname);
    t.equal(directories.length, 1);
    t.equal(directories[0].substring(directories[0].lastIndexOf('/') + 1, directories[0].length), 'fixtures');
    t.end();
  });

});
