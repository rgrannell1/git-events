
"use strict"





const is         = require('is')
const fs         = require('fs')
const path       = require('path')

const constants  = require('../commons/constants')
const emitEvents = require('../app/emit-events')
const errCodes   = require('err-codes')





const gitEvents = rawArgs => {

	const args = gitEvents.preprocess(rawArgs)

	if (args.version) {

		console.log(constants.packageJson.version)
		process.exit(1)

	}

	emitEvents(args.directory, args.pipeFile, args.useJson)

}

gitEvents.preprocess = rawArgs => {

	const args = {
		version:   rawArgs['--version'],
		directory: gitEvents.preprocess.directory(rawArgs['--directory']),
		useJson:   rawArgs['--json']
	}

	return args

}

gitEvents.preprocess.directory = directory => {

	try {

		if (!is.string(directory)) {
			throw Error('internal error: --directory was not a string.')
		}

		const resolvedDirectory = path.resolve(directory)
		const stats             = fs.lstatSync(directory)

		if (!stats.isDirectory( )) {
			throw Error('not a directory.')
		}

		return resolvedDirectory

	} catch (err) {

		var message = errCodes.codes.hasOwnProperty(err.code)
			? errCodes.codes[err.code].message
			: err.message

		console.error(`error: failed to preprocess '--directory' argument ${directory}: ${message}`)
		process.exit(1)

	}

}




module.exports = gitEvents
