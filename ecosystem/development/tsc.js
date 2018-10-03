import path from 'path'
import Process from '@mhy/process/dist'

const { moduleHome } = require('../../index')

const CmdTscCLI = [
	'node',
	require.resolve('typescript/lib/tsc.js')
]

const { compilerOptions, include } = require(path.resolve(moduleHome, 'typescript/index.js'))

for (const [key, value] of Object.entries(compilerOptions)) {
	switch(typeof value) {
		case 'boolean':
			value && CmdTscCLI.push(`--${key}`)
			break
		case 'number':
		case 'string':
		default:
			CmdTscCLI.push(`--${key}`)
			CmdTscCLI.push(value)
	}
}

CmdTscCLI.push(include[0])


class Tsc extends Process {
	constructor() {
		super()
		this.run('start')
	}

	onStart = ({name}) => this.spawn(name, CmdTscCLI)

	onRestart = async () => {
		await this.kill('start')
		this.run('start')
	}

	actions = [
		{
			name: 'start',
			enabled: true,
			onRun: this.onStart
		},
		{
			name: 'restart',
			label: 'Restart',
			shortcut: 'r',
			enabled: true,
			onRun: this.onRestart
		}
	]
}

module.exports.default = () => Tsc
