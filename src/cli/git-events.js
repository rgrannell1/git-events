#!/usr/bin/env node

"use strict"





const constants = require('../commons/constants')





const docs = `
Name:
	git-events -

Description:

Usage:
	git-events (-d <PATH> | --directory <PATH>)
	git-events (-h | --help | --version)

Options:
	-d <PATH>, --directory <PATH>    The path to monitor.
	-h, --help                       Display this documentation.
	--version                        Display the program's documentation.

Version:
	v${constants.packageJson.version}
`





const docopt    = require('docopt').docopt
const gitEvents = require('../app/git-events')




gitEvents(docopt(docs))
