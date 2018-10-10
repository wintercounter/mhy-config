import Process from '@mhy/process/dist'

const CmdStorybookStartCLI = [
    'node',
    require.resolve('@storybook/react/bin/index.js')
]

const { start } = require('../../storybook')

for (const [key, value] of Object.entries(start)) {
    if (value !== null) {
        CmdStorybookStartCLI.push(`--${key}`)
        CmdStorybookStartCLI.push(value)
    }
}


class StorybookStart extends Process {
    constructor() {
        super()
        this.run('start')
    }

    onStart = ({name}) => this.spawn(name, CmdStorybookStartCLI)

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

module.exports.default = () => StorybookStart
