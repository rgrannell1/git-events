
"use strict"




const path      = require('path')
const is        = require('is')
const fs        = require('fs')

const constants = require('../commons/constants')
const utils     = require('../commons/utils')





const createEmitterScript = (directory, eventFile, useJson, hook) => {

	createEmitterScript.precond(directory, hook)

	if (useJson) {

		return [

			'#!/usr/bin/env node',
			'',
			'var fs   = require("fs")',
			`var args = ["${hook}"].concat(process.argv.slice(2))`,
			'',
			`fs.appendFile("${eventFile}", JSON.stringify(args) + "\\n", err => { })`

		].join('\n')

	} else {

		return [

			'#!/usr/bin/env sh',
			'',
			`touch "${ eventFile }"`,
			'',
			`echo "${ hook } $@" >> "${ eventFile }"`,
			'exit 0'

		].join('\n')

	}

}

createEmitterScript.precond = (directory, hook) => {

	is.always.string(directory)
	is.always.string(hook)

}





const emitEvents = (directory, eventFile, useJson) => {

	emitEvents.precond(directory)

	const hooksDirectory = path.join(path.resolve(directory), '.git', 'hooks')
	const eventOutFile      = eventFile
		? eventFile
		: path.join(hooksDirectory, constants.files.defaultPipeName)

	const createEmitters = constants.hooks.map(hook => {

		const hookScriptPath = path.join(hooksDirectory, `${hook}`)
		const script         = createEmitterScript(hooksDirectory, eventOutFile, useJson, hook)

		return new Promise((resolve, reject) => {

			fs.writeFile(hookScriptPath, script, {mode: constants.modes.hook}, err => {
				err ? reject(err) : resolve( )

			})
		})

	})

	Promise.all(createEmitters).then(
		( ) => {
			console.log(`Initialised git-events scripts in ${hooksDirectory}`)
		},
		err => {
			console.log(`Failed to initialise git-events scripts: ${err.message}`)
			process.exit(1)
		}
	)

}

emitEvents.precond = directory => {
	is.always.string(directory)
}




module.exports = emitEvents
