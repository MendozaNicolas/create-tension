import * as fs from 'fs';
import ora from 'ora';
import path from 'path';
import { execSync } from 'child_process';
const CURR_DIR = process.cwd();

import spinnerBar from '../src/lib/SpinnerBar.js';


function createProjectDirectory(projectPath) {
    const spinner = ora({
        text: 'Creating project directory...',
        spinner: spinnerBar
    }).start();

    fs.mkdirSync(projectPath, { recursive: true });
    spinner.succeed('Project directory created.');
}

const createFromVanillaTemplate = (templatePath, newProjectPath) => {
    const projectName = formatProjectName(path.basename(newProjectPath));
    const spinner = ora({
        text: 'Creating sample file...',
        spinner: spinnerBar
    }).start();
    
    const filesToCreate = fs.readdirSync(templatePath);
  
    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;
  
      // get stats about the current file
      const stats = fs.statSync(origFilePath);
  
      if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
  
        // Rename
        if (file === '.npmignore') file = '.gitignore';
  
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
  
        // recursive call
        createFromVanillaTemplate(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    });

    fs.writeFileSync(path.join(newProjectPath, 'manifest.json'),
        `{
        "manifest_version": 3,
        "name": "${projectName}",
        "description": "A sample extension",
        "version": "1.0",
        "action": {
          "default_popup": "index.html",
          "default_icon": "icon.png"
        }
      }`);
    spinner.succeed('Vanilla template created');
  };

function initializeGitRepository(projectPath) {
    const spinner = ora({
        text: 'Initializing Git repository...',
        spinner: spinnerBar
    }).start();
    execSync('git init  > /dev/null 2>&1', { cwd: projectPath });
    spinner.succeed('Git repository initialized.');
}


function formatProjectName(projectName) {
    return projectName
        .split('-') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string with spaces
}

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src);
    return stat.isDirectory() ? copyDir(src, dest) : fs.copyFileSync(src, dest);
}



export { initializeGitRepository, createFromVanillaTemplate, createProjectDirectory }