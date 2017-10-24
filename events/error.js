module.exports = (bot, error, id) => {
  const console = require('chalk-console');
  console.red(`Error: Shard ${id} - ${error['stack']}`);
};
