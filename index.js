/**
* @module npm-versions
* @author Ryan Mottley <ligerzero459@gmail.com>
* @description Get all versions of an npm package
* @license MIT
*/

'use strict'

const request = require('request')

/**
* @method getVersions
* @param {String} npm package name
* @param {Function} callback
*/

exports.getVersions = functions (name, cb) {
  request('http://registry.npmjs.org/' + name, function(err, res, body) {
    if (err) {
      return cb(err)
    } else if (res.statusCode === 404) {
      return cb(new Error('Module not found in NPM Registry'))
    }
    
    try {
      const data = JSON.parse(body)
      const version = data['version']
      
      cb(null, version)
    } catch (err) {
      cb(err)
    }
  })
}
