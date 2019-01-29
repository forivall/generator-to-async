'use strict'

var Promise = require('any-promise')

module.exports = generatorToAsync
module.exports.resolve = resolveGenerator

function generatorToAsync(fn) {
  return function() {
    return resolveGenerator(fn.apply(this, arguments))
  }
}

function resolveGenerator(gen) {
  return new Promise(function(resolve, reject) {
    function step(key, arg) {
      var info
      var value
      try {
        info = gen[key](arg)
        value = info.value
      } catch (error) {
        reject(error)
        return
      }
      if (info.done) {
        resolve(value)
      } else {
        return Promise.resolve(value).then(
          function(value) {
            step('next', value)
          },
          function(err) {
            step('throw', err)
          },
        )
      }
    }
    return step('next')
  })
}
