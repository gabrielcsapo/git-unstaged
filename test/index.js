const test = require('tape');
const path = require('path');
const exec = require('child_process').exec;

const search = require('../lib/search').search;

test('git-unstaged', (t) => {
    const fixturesDirectory = path.resolve(__dirname, 'fixtures');

    t.test('create random git repos with content in them', (t) => {
        exec('mkdir test1 && cd test1 && git init && cat "hello world" > t.txt', {
            cwd: fixturesDirectory
        });
        t.end();
    });

    t.test('runs git-unstaged in test directory', (t) => {
        search(fixturesDirectory, 1, (c) => {
            t.equal(c[path.resolve(fixturesDirectory, 'test1')], "## Initial commit on master\n?? t.txt\n");
            t.end();
        });
    });

});
