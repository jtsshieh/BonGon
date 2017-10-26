const Eris = require('eris');
const bot = new Eris(process.env.TOKEN);

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

  const games = ['with BonGon', 'learning Java', 'with a Person', `on ${bot.guilds.size} guilds`, 'with music', 'hating', 'THE SKY IS FALLING', 'stoop, droop, and rool', 'with fun', 'rock paper scissors', 'tic tac toe', 'having fun' ];
  require('./loader/loader.js')(bot);
  bot.Load();
  setInterval(
    function() {
      bot.editStatus('online', {name: games[Math.floor(Math.random() * games.length)], type: 0});
    }
    , 180000);

}

init();
bot.connect();
