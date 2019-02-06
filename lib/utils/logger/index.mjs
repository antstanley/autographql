import chalk from 'chalk';

const logger = (level, message) => {
  switch (level) {
    case 'info':
      console.log(chalk.cyan(`\u2713 ${message}`));
      break;

    case 'action':
      console.log(chalk.green(`\u2713 ${message}`));
      break;

    case 'warn':
      console.log(chalk.yellow(message));
      break;

    case 'error':
      console.log(chalk.red(message));
      break;

    default:
      console.log(chalk.blue(message));
  }
};

export default logger;