
"use strict"





const path      = require('path')

const constants = require('../commons/constants')





const emitEvents = rawArgs => {

	const args = emitEvents.validate(emitEvents.preprocess(rawArgs))

	if (args.version) {

		console.log(constants.package.version)
		process.exit(1)

	}

}

emitEvents.validate = args => {
	return args
}

emitEvents.preprocess = rawArgs => {

	const args = {
		version:   rawArgs['--version']
	}

	if (args.directory) {
		args.directory = path.resolve(rawArgs['--directory'])
	}

	return args


}




module.exports = emitEvents
