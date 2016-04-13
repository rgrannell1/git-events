
"use strict"




const path      = require('path')
const fs        = require('fs')

const constants = require('../commons/constants')
const utils     = require('../commons/utils')





const createEmitterScript = hook => {

	return [
		'#!/usr/bin/env node',
		'',
		`[ -f ${ constants.files.pipeName } ] || mkfifo ${ constants.files.pipeName }`,
		`console.log(${ hook })`
	].join('\n')

}





const emitEvents = directory => {

	const hooksDirectory    = path.join(directory, '.git', 'hooks')
	const createDirectories = constants.hooks.map(hook => {

		const hookScript = path.join(hooksDirectory, `${hook}.js`)

		return new Promise((resolve, reject) => {
			utils.fs.createFile(hookScript, createEmitterScript(hook), {mode: constants.modes.defaultWithExecutable}, err => {
				err ? reject(err) : resolve( )
			})
		})

	})

	Promise.all(createDirectories).then(
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
