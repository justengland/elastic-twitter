var queries = exports = module.exports = {}
var fs = require('fs')
var Promise = require('bluebird')

function endsWith (source, suffix) {
  return source.indexOf(suffix, this.length - suffix.length) !== -1
}

queries.getAll = function () {
  return new Promise(function (resolve, reject) {
    fs.readdir('./client/queries', function (err, files) {
      if (err) {
        if (reject) reject(err)
      } else {
        var jsonFiles = []
        files.forEach(function (file) {
          if (endsWith(file, '.json')) {
            jsonFiles.push({
              display: file.substring(0, file.length - 5),
              source: '/queries/' + file
            })
          }
        })
        console.log('Files Downloaded: ', jsonFiles)
        if (resolve) resolve(jsonFiles)
      }
    })
  })
}
