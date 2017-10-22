const Eris = require('eris');

let bot = new Eris(process.env.TOKEN);
bot.getBotGateway().then(result => {
    let shards = result.shards;
    bot.options.maxShards = shards;
});

bot.settings = new Eris.Collection();
bot.commands = new Eris.Collection();
bot.functions = new Eris.Collection();
bot.aliases = new Eris.Collection();
bot.RichEmbed = require ('./structures/embed.js');
bot.servers = {};

const cmdLoader = require('./loader/commandLoader');
const funLoader = require('./loader/functionLoader');
const eveLoader = require('./loader/eventLoader');

async function load(){
    await cmdLoader.load(bot);
    await funLoader.load(bot);
    await eveLoader.load(bot);
}

load();

bot.editStatus('online', {name: 'b!help', type: 0});
bot.connect();
