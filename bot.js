const Eris = require('eris');
let bot = new Eris(process.env.TOKEN);

async function init(){
    bot.getBotGateway().then(result => {
        let shards = result.shards;
        bot.options.maxShards = shards;
    });

    bot.settings = new Eris.Collection();
    bot.commands = new Eris.Collection();
    bot.functions = new Eris.Collection();
    bot.aliases = new Eris.Collection();
    bot.servers = {};

    const Loader = require('./loader/loader.js')(bot);
    Loader();
    bot.editStatus('online', {name: 'b!help', type: 0});
}

init()
bot.connect();
