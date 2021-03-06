const fs = require('fs');
const console = require('chalk-console');
exports.load = async (bot) => {
  fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} functions into the memory.`, false);
    files.forEach(file => {

      try {
        require(`../functions/${file}`)(bot);
        bot.functions.set(file.substr(0, file.lastIndexOf('.')), file.substr(0, file.lastIndexOf('.')));
        console.blue(`Attempting to load the function "${file.substr(0, file.lastIndexOf('.'))}".`, false);
      }
      catch (err) {
        console.red('An error has occured trying to load a function. Here is the error.');
        console.red(err.stack);
      }
    });
    console.green('Function Loading complete!');
    console.log('\n');
  });
};
