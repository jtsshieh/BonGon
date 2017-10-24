const fs = require('fs');
const console = require('chalk-console');
exports.load = async (bot) => {
  fs.readdir('./structures/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} structures into the memory.`, false);
    files.forEach(file => {

      try {
        bot[file.substr(0, file.lastIndexOf('.'))] = require(`../structures/${file}`);
        console.blue(`Attempting to load the structure "${file.substr(0, file.lastIndexOf('.'))}".`, false);
      }
      catch (err) {
        console.red('An error has occured trying to load a structure. Here is the error.');
        console.red(err.stack);
      }
    });
    console.green('Structure Loading complete!');
    console.log('\n');
  });
};
