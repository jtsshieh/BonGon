module.exports = (bot, error, id) => {
    const console = require('chalk-console');
    console.red(`Shard ${id} has Disconnected` + (error ? ': ' + error.message : ''));
};
