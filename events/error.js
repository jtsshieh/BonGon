module.exports = (bot, error, id) => {
    console.red(`Error: Shard ${id} - ${error['stack']}`);
};
