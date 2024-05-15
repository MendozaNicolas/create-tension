import { readdir, stat, readFile, mkdir, writeFile, copyFile } from 'fs/promises';
import ora from 'ora';
import path from 'path';
import { exec } from 'child_process';
const CURR_DIR = process.cwd();

import spinnerBar from '../src/lib/SpinnerBar.js';


async function createProjectDirectory(projectPath) {
  const spinner = ora({
    text: 'Creating project directory...',
    spinner: spinnerBar
  }).start();

  await mkdir(projectPath, { recursive: true });
  spinner.succeed('Project directory created.');
}

async function createFromVanillaTemplate(templatePath, newProjectPath) {
  const projectName = formatProjectName(path.basename(newProjectPath));
  const spinner = ora({
    text: 'Creating sample file...',
    spinner: spinnerBar
  }).start();

  const filesToCreate = await readdir(templatePath);

  for (const file of filesToCreate) {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = await stat(origFilePath);

    if (stats.isFile()) {
      const contents = await readFile(origFilePath, 'utf8');

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      await writeFile(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      await mkdir(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      await createFromVanillaTemplate(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  }

  await writeFile(path.join(newProjectPath, 'manifest.json'),
    `{
        "manifest_version": 3,
        "name": "${projectName}",
        "description": "A sample extension",
        "version": "1.0",
        "action": {
          "default_popup": "index.html",
          "default_icon": "icon.png"
        }
      }`
  );

  spinner.succeed('Vanilla template created');
};

async function initializeGitRepository(projectPath) {
  const spinner = ora({
    text: 'Initializing Git repository...',
    spinner: spinnerBar
  }).start();

  return new Promise((resolve, reject) => {
    exec('git init > NUL 2>&1', { cwd: projectPath }, (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        spinner.fail('Failed to initialize Git repository.');
        reject(error);
        return;
      }

      spinner.succeed('Git repository initialized.');
      resolve();
    });
  });
}


function formatProjectName(projectName) {
  return projectName
    .split('-') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string with spaces
}

function copyDir(srcDir, destDir) {
  mkdir(destDir, { recursive: true });
  for (const file of readdir(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function copy(src, dest) {
  const stat = stat(src);
  return stat.isDirectory() ? copyDir(src, dest) : copyFile(src, dest);
}



export { initializeGitRepository, createFromVanillaTemplate, createProjectDirectory }