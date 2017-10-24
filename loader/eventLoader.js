const fs = require('fs');
const console = require('chalk-console');
exports.load = async (bot) => {
    fs.readdir('./events/', (err, files) => {
        if (err) console.error(err);
        console.cyan(`Attempting to load a total of ${files.length} events into the memory.`, false);
        files.forEach(file => {
            try {
                const eventName = file.split('.')[0];
                const event = require(`../events/${file}`);
                console.blue(`Attempting to load the event "${eventName}".`, false);
                bot.on(eventName, event.bind(null, bot));
                delete require.cache[require.resolve(`../events/${file}`)];
            }
            catch (err) {
                console.red('An error has occured trying to load a event. Here is the error.');
                console.red(err.stack);
            }
        });
        console.green('Event Loading complete!');
        console.log('\n');
    });
};
