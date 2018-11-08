import path from 'path'
import Process from '@mhy/process/dist'

const CmdBabelCLI = [
	'node',
	require.resolve('@babel/cli/bin/babel.js'),
	path.resolve(process.cwd(), 'src'),
	'--out-dir',
	'dist',
	'--config-file',
	path.resolve(__dirname, '../../babel'),
	'--ignore',
	'node_modules,test,tests,dist,temp,tmp',
	'--delete-dir-on-start',
    '--extensions',
	'.js,.jsx,.ts,.tsx',
	...process.argv.slice(4)
]

class Babel extends Process {
    static isEnabled = true

    constructor(args) {
        const { args: [defaultAction = 'start'], flags } = args
        super(args)
        this.run(defaultAction, { flags })
    }

	onStart = ({name}) => this.spawn(name, CmdBabelCLI)

	actions = [
		{
			name: 'start',
			enabled: true,
			onRun: this.onStart
		}
	]
}

module.exports.default = () => Babel
