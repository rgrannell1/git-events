
"use strict"




const path      = require('path')
const fs        = require('fs')

const constants = require('../commons/constants')
const utils     = require('../commons/utils')





const createEmitterScript = (directory, hook) => {

	const pipePath = path.join(directory, constants.files.pipeName)

	return [

		'#!/usr/bin/env sh',
		'',
		`[ -p "${ pipePath }" ] || mkfifo "${ pipePath }"`,
		'',
		`echo "${ hook }" > ${ pipePath }`,
		'exit 0'

	].join('\n')

}





const emitEvents = directory => {

	const hooksDirectory = path.join(directory, '.git', 'hooks')
	const createEmitters = constants.hooks.map(hook => {

		const hookScriptPath = path.join(hooksDirectory, `${hook}.sh`)
		const script     = createEmitterScript(hooksDirectory, hook)

		return new Promise((resolve, reject) => {
			utils.fs.createFile(hookScriptPath, script, {mode: constants.modes.defaultWithExecutable}, err => {
				err ? reject(err) : resolve( )
			})
		})

	})

	Promise.all(createEmitters).then(
		( ) => {
			console.log('done')
		},
		err => {
			console.log(err)
			process.exit(1)
		}
	)

}




module.exports = emitEvents
