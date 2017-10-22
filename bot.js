const Eris = require('eris');

let bot = new Eris(process.env.TOKEN);
bot.getBotGateway().then(result => {
    let shards = result.shards;
    bot.options.maxShards = shards;
});

bot.settings = new Eris.Collection();
bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();
bot.RichEmbed = require ('./structures/embed.js');
bot.servers = {};

const cmdLoader = require('./loader/commandLoader');
const funLoader = require('./loader/functionLoader');
const eveLoader = require('./loader/eventLoader');

async function load(){
    await cmdLoader.load(bot);
    console.log('\n\n');
    await funLoader.load(bot);
    console.log('\n\n');
    await eveLoader.load(bot);
    console.log('\n\n');
}

load();
bot.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            bot.commands.delete(command);
            bot.aliases.forEach((cmd, alias) => {
                if (cmd === command) bot.aliases.delete(alias);
            });
            bot.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e){
            reject(e);
        }
    });
};
bot.editStatus('online', {name: 'b!help', type: 0});
bot.connect();
