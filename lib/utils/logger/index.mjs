import chalk from 'chalk';

var logger = (level, message) => {
  var nowDateTime = new Date();
  var nowString = nowDateTime.toISOString().substr(11, 12);

  switch (level) {
    case 'info':
      console.log(chalk.gray("[" + nowString + "]") + " " + chalk.green('\u2713') + " " + chalk.cyan(message));
      break;

    case 'action':
      console.log(chalk.gray("[" + nowString + "]") + " " + chalk.green('\u2713') + " " + chalk.cyan(message));
      break;

    case 'warn':
      console.log(chalk.gray("[" + nowString + "]") + " " + chalk.yellow(message));
      break;

    case 'error':
      console.log(chalk.gray("[" + nowString + "]") + " " + chalk.red('\u274C') + " " + chalk.cyan(message));
      break;

    default:
      console.log(chalk.gray("[" + nowString + "]") + " " + chalk.blue(message));
  }
};

export default logger;