const cmdLoader = require('./commandLoader.js');
const funLoader = require('./functionLoader.js');
const eveLoader = require('./eventLoader.js');
const strLoader = require('./structureLoader.js');

module.exports = async (bot) => {
  bot.Load = async () => {
    await cmdLoader.load(bot);
    await funLoader.load(bot);
    await eveLoader.load(bot);
    await strLoader.load(bot);
  };
};
