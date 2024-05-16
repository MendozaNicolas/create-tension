#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import path from 'path';
import ora from "ora";

import { createProjectDirectory, createFromVanillaTemplate, initializeGitRepository } from './generator.js';
import projectNames from '../src/utils/projectNames.json' assert { type: 'json' };
import spinnerBar from "../src/lib/SpinnerBar.js";

program.version("1.0.0").description("Create tension project");
console.log("\n" + chalk.black.bold.bgHex('#FFD31B')(' TENSION '))

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Where should we create your new project?",
        default: "project-"+projectNames[Math.floor(Math.random() * projectNames.length)],
        prefix: "\n   " + chalk.white.bgHex('#68217A')(' DIR ') + " "
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template:",
        choices: ["Include sample files", "Empty"],
        prefix: "\n   " + chalk.white.bgHex('#68217A')(' tmpl ') + " "
      },
      {
        type: "list",
        name: "framework",
        message: "Do you plan to use framework?",
        choices: ["Yes", "No"],
        prefix: "\n   " + chalk.white.bgHex('#68217A')(' js ') + " "
      },
      {
        type: "list",
        name: "git",
        message: "Initialize a new git repository? (optional)",
        choices: ["Yes", "No"],
        prefix: "\n   " + chalk.white.bgHex('#68217A')(' git ') + " "
      },
    ])
    .then( async (result) => {

      const spinner = ora({
        text: "Creating project...",
        spinner: spinnerBar,
        prefixText: "\n"
      }).start();

      const projectPath = path.join(process.cwd(), result.name);
      const templatePath = path.join(process.cwd(), "/src/templates/vanilla-template");

      await createProjectDirectory(projectPath);
      
      if (result.template === 'Include sample files') {
        // createFromVanillaTemplate(projectPath, path.join(process.cwd(), "/src/templates/vanilla-template"));
        await createFromVanillaTemplate(templatePath, result.name);
      } 

      if (result.framework === 'Yes') {
        // createFromVanillaTemplate(projectPath, path.join(process.cwd(), "/src/templates/vanilla-template"));
        pass;
      } 

      if (result.git === 'Yes') {
        await initializeGitRepository(projectPath);
      }
      
      spinner.succeed("Project created successfully!");
    });
});

program.parse(process.argv);