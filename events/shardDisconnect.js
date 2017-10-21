module.exports = (bot, error, id) => {
    console.red(`Shard ${id} has Disconnected` + (error ? ': ' + error.message : ''));
};
