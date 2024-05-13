const inquirer = require('inquirer');
const chalk = require('chalk');

class CustomPrompt {
    constructor(questions, rl, answers) {
        this.rl = rl;
        this.question = questions[0];
        this.selected = 0;
        this.choices = this.question.choices;
    }

    render() {
        let output = '\n';

        this.choices.forEach((choice, i) => {
            const isSelected = (i === this.selected);
            let line = (isSelected ? chalk.cyan('>') : ' ') + ' ' + choice;
            if (isSelected) line = chalk.black.bgWhite(line);
            output += line + '\n';
        });

        console.log(output);
    }

    _run(cb) {
        this.render();

        const keypressHandler = (ch, key) => {
            if (key.name === 'up') {
                this.selected = Math.max(this.selected - 1, 0);
            } else if (key.name === 'down') {
                this.selected = Math.min(this.selected + 1, this.choices.length - 1);
            } else if (key.name === 'return') {
                this.rl.input.removeListener('keypress', keypressHandler);
                cb(this.choices[this.selected]);
                return;
            }

            this.render();
        };

        this.rl.input.on('keypress', keypressHandler);
    }

    run() {
        return new Promise((resolve, reject) => {
            this._run(resolve);
        });
    }
}

export default CustomPrompt;