const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'BonGon>'
});

module.exports = () => {
  console.log('Welcome to the BonGon Console. To list all the commands, type "help"');
  rl.prompt();

  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'help':
        console.log('help :: Display help for the console \nexit :: Exits this program');
        break;
      case 'exit':
        console.log('Bye Bye!');
        process.exit(0);
        break;
      default:
        console.log(`'${line.trim()}' is not one of the commads`);
        break;
    }
    rl.prompt();
  });
};
