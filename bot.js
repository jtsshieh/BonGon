const Eris = require('eris');
const bot = new Eris(process.env.TOKEN);

async function init() {
  bot.getBotGateway().then(result => {
    const shards = result.shards;
    bot.options.maxShards = shards;
  });

  bot.settings = new Map();
  bot.commands = new Eris.Collection();
  bot.functions = new Eris.Collection();
  bot.aliases = new Eris.Collection();
  bot.servers = {};

  require('./loader/loader.js')(bot);
  bot.Load();
  setInterval(
    function() {
      const games = [{name:'with BonGon', type: 1}, 'learning Java', 'with a Person', `on ${bot.guilds.size} guilds`, 'with music', 'hating', 'THE SKY IS FALLING', 'stoop, droop, and rool', 'with fun', 'rock paper scissors', 'tic tac toe', 'having fun' ];
      bot.editStatus('online', {name: games[Math.floor(Math.random() * games.length)]});
    }
    , 180000);
}

init();
bot.connect();
