const util = require('util')
const fs = require('fs')

let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./resource/content.txt', 'utf8').then(value => console.log(value), reason => console.log(reason))