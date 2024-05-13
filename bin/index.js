#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
// import CustomPrompt from "./CustomPrompt";
import ora from "ora";

program.version("1.0.0").description("Create tension project");

// inquirer.registerPrompt('custom', CustomPrompt);
program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Where should we create your new project?",
        default: "./holamundo",
        prefix: "   " + chalk.white.bgHex('#C66394')(' DIR ') + " "
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template:",
        choices: ["Include sample files", "Empty"],
        prefix: "   " + chalk.white.bgHex('#C66394')(' tmpl ') + " "
      },
      {
        type: "list",
        name: "js",
        message: "Do you plan to write TypeScript?",
        choices: ["Yes", "No"],
        prefix: "   " + chalk.white.bgHex('#C66394')(' js ') + " "
      },
      {
        type: "list",
        name: "git",
        message: "Initialize a new git repository? (optional)",
        choices: ["Yes", "No"],
        prefix: "   " + chalk.white.bgHex('#C66394')(' git ') + " "
      },
    ])
    .then((result) => {
      const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner

      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 3000);
    });
});


program.parse(process.argv);