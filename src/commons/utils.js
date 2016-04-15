
"use strict"


const is       = require('is')
const fs       = require('fs')
const errCodes = require('err-codes')

const constants = require('../commons/constants')





const utils = {
	fs:     { },
	string: { }
}





utils.fs.mkdirp = (path, callback) => {

	utils.fs.mkdirp.precond(path, callback)

	fs.mkdir(path, err => {

		err.code !== errCodes.aliases.fileExists.code
			? callback(err)
			: callback(null)

	})

}

utils.fs.mkdirp.precond = (path, callback) => {
	is.always.string(path)
	is.always.function(callback)
}





module.exports = utils
