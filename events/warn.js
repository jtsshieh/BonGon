module.exports = (bot, message, id) => {
    const console = require('chalk-console');
    console.yellow(`Warning: Shard ${id} - ${message}`);
};
