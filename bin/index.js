#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

import names from '../src/utils/projectNames.json' assert { type: 'json' };


const spinnerBar = {
  interval: 80, // Optional
  frames: [
    chalk.hex('#68217a')('██████'), 
    chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('█████'), 
    chalk.hex('#554359')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('████'), 
    chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('███'), 
    chalk.hex('#445F3D')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('██'),
    chalk.hex('#3A6F2C')('█') + chalk.hex('#445F3D')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('█'),
    chalk.hex('#337A20')('█') + chalk.hex('#3A6F2C')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#68217a')('█'),
    chalk.hex('#337A20')('██') + chalk.hex('#3A6F2C')('█') + chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█'),
    chalk.hex('#337A20')('███') + chalk.hex('#3A6F2C')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#554359')('█'),
    chalk.hex('#337A20')('████') + chalk.hex('#3A6F2C')('█') + chalk.hex('#4E4E4D')('█'),
    chalk.hex('#337A20')('█████') + chalk.hex('#3A6F2C')('█'),
    chalk.hex('#337A20')('██████'),
    chalk.hex('#3A6F2C')('█') + chalk.hex('#337A20')('█████'),
    chalk.hex('#445F3D')('█') + chalk.hex('#3A6F2C')('█') + chalk.hex('#337A20')('████'),
    chalk.hex('#4E4E4D')('█') + chalk.hex('#445F3D')('█') + chalk.hex('#3A6F2C')('█') + chalk.hex('#337A20')('███'),
    chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#445F3D')('█') + chalk.hex('#3A6F2C')('█') + chalk.hex('#337A20')('██'),
    chalk.hex('#5B3864')('█') + chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#445F3D')('█') + chalk.hex('#3A6F2C')('█') + chalk.hex('#337A20')('█'),
    chalk.hex('#68217A')('█') + chalk.hex('#5B3864')('█') + chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#445F3D')('█') + chalk.hex('#3A6F2C')('█'),
    chalk.hex('#68217A')('██') + chalk.hex('#5B3864')('█') + chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█') + chalk.hex('#445F3D')('█'),
    chalk.hex('#68217A')('███') + chalk.hex('#5B3864')('█') + chalk.hex('#554359')('█') + chalk.hex('#4E4E4D')('█'),
    chalk.hex('#68217A')('████') + chalk.hex('#5B3864')('█') + chalk.hex('#554359')('█'),
    chalk.hex('#68217A')('█████') + chalk.hex('#5B3864')('█')]
};
// inquirer.registerPrompt('custom', CustomPrompt);


program.version("1.0.0").description("Create tension project");
console.log("\n" + chalk.black.bold.bgHex('#ffd31b')(' TENSION '))


program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Where should we create your new project?",
        default: "project-"+names[Math.floor(Math.random() * names.length)],
        prefix: "\n   " + chalk.white.bgHex('#68217a')(' DIR ') + " "
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template:",
        choices: ["Include sample files", "Empty"],
        prefix: "\n   " + chalk.white.bgHex('#68217a')(' tmpl ') + " "
      },
      {
        type: "list",
        name: "js",
        message: "Do you plan to write TypeScript?",
        choices: ["Yes", "No"],
        prefix: "\n   " + chalk.white.bgHex('#68217a')(' js ') + " "
      },
      {
        type: "list",
        name: "git",
        message: "Initialize a new git repository? (optional)",
        choices: ["Yes", "No"],
        prefix: "\n   " + chalk.white.bgHex('#68217a')(' git ') + " "
      },
    ])
    .then((result) => {
      const spinner = ora({
        text: `Doing ${result.name}...`,
        spinner: spinnerBar,
        prefixText: "\n"
      });
      spinner.start();// Start the spinner
      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 3000);
    });
});


program.parse(process.argv);