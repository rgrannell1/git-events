
"use strict"





const fs         = require('fs')
const path       = require('path')

const constants  = require('../commons/constants')
const emitEvents = require('../app/emit-events')





const gitEvents = rawArgs => {

	const args = gitEvents.validate(gitEvents.preprocess(rawArgs))

	if (args.version) {

		console.log(constants.package.version)
		process.exit(1)

	}

	emitEvents(args.directory)

}

gitEvents.validate = args => {
	return args
}

gitEvents.preprocess = rawArgs => {

	const args = {
		version:   rawArgs['--version']
	}

	if (rawArgs['--directory']) {
		try {

			const directory = path.resolve(rawArgs['--directory'])
			const stats     = fs.lstatSync(directory)

			if (!stats.isDirectory( )) {
				throw Error('not a directory.')
			}

			args.directory  = directory

		} catch (err) {
			console.error(`error: failed to validate '--directory' argument ${rawArgs['--directory']}: ${err.message}`)
			process.exit(1)
		}
	}

	return args

}




module.exports = gitEvents
