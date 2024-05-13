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
        default: "./holamundo"
      },
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["Option 1", "Option 2", "Option 3"],
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