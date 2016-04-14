
"use strict"


const fs       = require('fs')
const errCodes = require('err-codes')

const constants = require('../commons/constants')





const utils = {
	fs:     { },
	string: { }
}





utils.fs.mkdirp = (path, callback) => {

	fs.mkdir(path, err => {


		err.code !== errCodes.aliases.fileExists.code
			? callback(err)
			: callback(null)

	})

}

utils.fs.createFile = (path, content, options, callback) => {

	fs.writeFile(path, content, options, err => {
		callback(err)
	})

}





module.exports = utils
