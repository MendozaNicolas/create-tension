#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import path from 'path';
import ora from "ora";

import { dirname } from 'path';
import { fileURLToPath } from "url";
const CURR_DIR = process.cwd();


import names from '../src/utils/projectNames.json' assert { type: 'json' };
import { createProjectDirectory, createFromVanillaTemplate, initializeGitRepository } from './generator.js';
import spinnerBar from "../src/lib/SpinnerBar.js";


const __dirname = dirname(fileURLToPath(import.meta.url))

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
        message: "Do you plan to write JavaScript?",
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
        text: "Creating project...",
        spinner: spinnerBar,
        prefixText: "\n"
      }).start();

      const projectPath = path.join(process.cwd(), result.name);
      const templatePath = path.join(process.cwd(), "/src/templates/vanilla-template");

      createProjectDirectory(projectPath);
      
      if (result.template === 'Include sample files') {
        // createFromVanillaTemplate(projectPath, path.join(process.cwd(), "/src/templates/vanilla-template"));
        createFromVanillaTemplate(templatePath, result.name);
      } 

      if (result.git === 'Yes') {
        initializeGitRepository(projectPath);
      }
      
      spinner.succeed("Project created successfully!");
    });
});

program.parse(process.argv);