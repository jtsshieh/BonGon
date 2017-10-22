const fs = require('fs');
const console = require('chalk-console');
exports.load = async(bot) => {
    fs.readdir('./commands', (err, files) => {
        if (err) console.error(err);
        console.cyan(`Attempting to load a total of ${files.length} commands into the memory.`, false);
        files.forEach(file => {
            try{
                let command = require(`../commands/${file}`);
                console.blue(`Attempting to load the command "${command.help.name}".`, false);
                bot.commands.set(command.help.name, command);
                command.conf.aliases.forEach(alias => {
                    bot.aliases.set(alias, command.help.name);
                    console.blue(`Attempting to load "${alias}" as an alias for "${command.help.name}"`, false);
                });
            }
            catch(err){
                console.red('An error has occured trying to load a command. Here is the error.');
                console.red(err.stack);
            }
        });
        console.green('Command Loading complete!');
    });
};
