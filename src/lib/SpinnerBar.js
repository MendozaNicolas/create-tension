import chalk from "chalk";

const spinnerBar = {
    interval: 80, 
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

  export default spinnerBar;