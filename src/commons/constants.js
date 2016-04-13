
"use strict"




var constants = {
	hooks: [

		'applypatch-msg',
		'commit-msg',
		'post-applypatch',
		'post-checkout',
		'post-commit',
		'post-merge',
		'post-rewrite',
		'post-update',
		'pre-applypatch',
		'pre-auto-gc',
		'pre-commit',
		'pre-rebase',
		'pre-receive',
		'prepare-commit-msg',
		'update'

	],
	files: {
		pipeName: 'git-events'
	},
	errCodes: {
		notFound:      'ENOENT',
		alreadyExists: 'EEXIST'
	},
	packageJson: require('../../package'),
	modes: {
		defaultWithExecutable: '775'
	}
}





module.exports = constants
