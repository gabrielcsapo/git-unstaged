const path = require('path')
const { getContents, getDirectories } = require('./utils')

async function search (directory, depth) {
  const found = [[directory]]
  const output = {}

  for (var i = 0; i <= depth; i++) {
    for (var s = 0; s <= found[i].length - 1; s++) {
      if (i < depth) {
        found.push(await getDirectories(found[i][s]))
      }
    }
  }

  const all = [].concat.apply([], found)

  for (const dir of all) {
    const contents = await getContents(path.resolve(directory, dir))

    if (contents) {
      output[path.resolve(directory, dir)] = contents
    }
  }

  return output
}

module.exports = {
  search,
  getDirectories,
  getContents
}
