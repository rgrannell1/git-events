#!/usr/bin/env node

"use strict"





const constants = require('../commons/constants')





const docs = `
Name:
	git-events - wraps git-hooks in a serverless, unix-friendly publish-subscript interface

Description:

	Typically, to add git hooks to a repository you:

	* create a separate script for handling each git hook.
	* copy these into that repositories git hook folder.

	with git-events you:

	* call this command on your repo, and optionally say where to create an events file.
	* read from this file using any programming language, and perform an action for particular hooks

Usage:
	git-events (-d <PATH> | --directory <PATH>) [-j | --json]
	git-events (-h | --help | --version)

Options:
	-j, --json                       Should the arguments be emitted in a JSON array?
	-d <PATH>, --directory <PATH>    The path to monitor.
	-h, --help                       Display this documentation.
	--version                        Display the program's documentation.

Version:
	v${constants.packageJson.version}
`





const docopt    = require('docopt').docopt
const gitEvents = require('../app/git-events')




gitEvents(docopt(docs))
