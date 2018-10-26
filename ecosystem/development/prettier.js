import path from 'path'
import Process from '@mhy/process/dist'

import { moduleHome } from '../..'

const getPrettierCLICmd = (flags = [], fileName) => {
    // It's a file/path, use that
    let file = flags[flags.length]
    if (!file) {
        flags.push(fileName || `"${path.resolve(process.cwd(), 'src/**/*.js')}"`)
    }
    return [
        'node',
        require.resolve('prettier/bin-prettier.js'),
        `--config=${path.resolve(moduleHome, 'prettier/index.js')}`,
        '--write',
        ...flags
    ]
}

const getPrettierServeCLICmd = (flags) => [
    'node',
    require.resolve('chokidar-cli/index.js'),
    `"src/**/*.js"`,
    '-c',
    `"${getPrettierCLICmd(flags, '{path}').join(' ')}"`,
    '--initial',
    '--ignore',
    '"node_modules"'
]

class Prettier extends Process {
    static isEnabled = false

    get commandToUse() {
        return process.MHY_ENV === 'ui'
            ? getPrettierServeCLICmd
            : getPrettierCLICmd
    }

    constructor(defaultAction = 'start') {
        super()
        this.run(defaultAction)
    }

    onStart = ({name}, {flags = []}) => this.spawn(name, this.commandToUse(flags))

    onRestart = async () => {
        await this.kill('start')
        this.run('start')
    }

    // Feature test only
    processLine(d) {
        if (d.startsWith('change:')) {
            this.emit('action', 'clear')
        }
        return d
        .replace('PASS', '{green-bg} PASS {/green-bg}')
        .replace('FAIL', '{red-bg} FAIL {/red-bg}')
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

module.exports.default = () => Prettier

