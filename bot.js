const Eris = require("eris");
const fs = require('fs');
const schedule = require('node-schedule')
const config = require('./config.json')
const Enmap = require("enmap");
const readline = require('readline');


schedule.scheduleJob({hour: 00, minute: 00}, () => {
    bot.gons.set(msg.author.id['daily'], false)
})
var bot = new Eris(config.token);
const talkedRecently = new Set();
bot.getBotGateway().then(result => {
    let shards = result.shards;
    bot.options.maxShards = shards
});


bot.settings = new Enmap({name: "settings", persistent: true});
bot.gons = new Enmap({name: "gons", persistent: true});
bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();
bot.functions = new Eris.Collection();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'BonGon>'
});

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`Attempting to load a total of ${files.length} commands into the memory.`);
    files.forEach(file => {
        try{
            let command = require(`./commands/${file}`);
            console.log(`Attempting to load the command "${command.help.name}".`);
            bot.commands.set(command.help.name, command);
            command.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, command.help.name);
                console.log(`Attempting to load "${alias}" as an alias for "${command.help.name}"`)
            });
        }
        catch(err){
            console.log(`An error has occured trying to load a command. Here is the error.`)
            console.log(err)
        }
    });
    console.log(`Command Loading complete!`)
});

fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    console.log(`Attempting to load a total of ${files.length} functions into the memory.`);
    files.forEach(file => {
        try{
            let functions = require(`./functions/${file}`);
            console.log(`Attempting to load the function "${file.substr(0, file.lastIndexOf("."))}".`);
            bot.functions.set(file.substr(0, file.lastIndexOf(".")), functions);
        }
        catch(err){
            console.log(`An error has occured trying to load a function. Here is the error.`)
            console.log(err)
        }
    });
    console.log(`Function Loading complete!`)
});

bot.on("guildCreate", (guild) => {
    bot.settings.set(guild.id, {"prefix": "j!", "modlogs":"mod-logs", "welcome": false, "welcomeMessage": "Welcome to the server", "welcomeChannel" : "general", "Perm2": "Trusted", "Perm3": "Moderator", "Perm4" : "Admin", "Perm5": "Owner"});
})

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
bot.editStatus("online", {name: "j!help | BonGon", type: 0});
//Ready Event
bot.on("ready", () => {
    console.log("Welcome to the BonGon Console. To list all the commands, type 'help'")
    rl.prompt();

    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'help':
                console.log('help :: Display help for the console \nexit :: Exits this program');
                break;
            case 'exit':
                console.log('Bye Bye!')
                process.exit(0)
            default:
                console.log(`'${line.trim()}' is not one of the commads`);
            break;
      }
      rl.prompt();
    })
});


bot.on("messageCreate", (msg) =>{
    if (msg.author.bot) return;
    if (bot.settings.get(msg.member.guild.id) == undefined){
        bot.settings.set(msg.member.guild.id, {"prefix": "j!", "modlogs":"mod-logs", "welcome": false, "welcomeMessage": "Welcome to the server", "welcomeChannel" : "general", "Perm2": "Trusted", "Perm3": "Moderator", "Perm4" : "Admin", "Perm5": "Owner"});
    }
    if (!msg.content.startsWith(bot.settings.get(msg.member.guild.id).prefix)) return;
    let command = msg.content.split(' ')[0].slice(bot.settings.get(msg.member.guild.id).prefix.length);
    let args = msg.content.split(' ').slice(1);
    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd) {
        try{
            cmd.run(bot, msg, args);
        }
        catch(e){
            const errors = require('./functions/errors.js')
            msg.channel.createMessage({ embed: errors.errorMessage(bot, e) })
        }
    }
});

//Events
bot.on('disconnect', () => {
    console.log('Bot has now Disconnected from Discord')
})

bot.on('warn', (message, id) => {
    console.log(`Warning: Shard ${id} - ${message}`)
})

bot.on('error', (error, id) => {
    console.log(`Error: Shard ${id} - ${error['stack']}`)

})

bot.on('shardReady', id => {
    console.log(`Shard ${id} is Now Ready`)
})

bot.on('shardResume', id => {
    console.log(`Shard ${id} has Resumed`)
})

bot.on('shardDisconnect', (error, id) => {
    console.log(`Shard ${id} has Disconnected` + (error ? ': ' + error.message : ''))
})

bot.connect();
