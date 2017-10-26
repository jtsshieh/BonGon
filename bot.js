const Eris = require('eris');
const bot = new Eris(process.ENV.TOKEN);

async function init() {
  bot.getBotGateway().then(result => {
    const shards = result.shards;
    bot.options.maxShards = shards;
  });

  bot.settings = new Eris.Collection();
  bot.commands = new Eris.Collection();
  bot.functions = new Eris.Collection();
  bot.aliases = new Eris.Collection();
  bot.servers = {};

  console.log( Array.from( bot.guilds.keys() ))
  require('./loader/loader.js')(bot);
  bot.Load();
  bot.editStatus('online', {name: 'b!help', type: 0});
}

init();
bot.connect();
