const fs = require('fs');
const console = require('chalk-console');
exports.load = async() => {
    fs.readdir('./events/', (err, files) => {
        if (err) console.error(err);
        console.cyan(`Attempting to load a total of ${files.length} events into the memory.`, false);
        files.forEach(file => {
            try{
                let eventName = file.split('.')[0];
                let event = require(`../events/${file}`);
                console.blue(`Attempting to load the event "${eventName}".`, false);
                bot.on(eventName, event.bind(null, bot));
                delete require.cache[require.resolve(`./events/${file}`)];
            }
            catch(err){
                console.red('An error has occured trying to load a event. Here is the error.');
                console.red(err.stack);
            }
        });
        console.green('Event Loading complete!');
    });
};
