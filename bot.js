const Eris = require("eris");
const fs = require('fs');
const schedule = require('node-schedule')
const config = require('./config.json')
const Enmap = require("enmap");
const readline = require('readline');
const console = require('chalk-console');

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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'BonGon>'
});

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} commands into the memory.`, false);
    files.forEach(file => {
        try{
            let command = require(`./commands/${file}`);
            console.blue(`Attempting to load the command "${command.help.name}".`, false);
            bot.commands.set(command.help.name, command);
            command.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, command.help.name);
                console.blue(`Attempting to load "${alias}" as an alias for "${command.help.name}"`, false)
            });
        }
        catch(err){
            console.red(`An error has occured trying to load a command. Here is the error.`)
            console.red(err)
        }
    });
    console.green(`Command Loading complete!`)
});

fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} functions into the memory.`, false);
    files.forEach(file => {

        try{
            require(`./functions/${file}`)(bot);
            console.blue(`Attempting to load the function "${file.substr(0, file.lastIndexOf("."))}".`, false);
        }
        catch(err){
            console.red(`An error has occured trying to load a function. Here is the error.`)
            console.red(err.stack)
        }
    });
    console.green(`Function Loading complete!`)
});
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

/*fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} events into the memory.`, false);
    files.forEach(file => {
        try{
            let eventName = file.split(".")[0];
            let event = require(`./events/${file}`)(bot);
            console.blue(`Attempting to load the event "${eventName}".`, false);
            bot.on(eventName, (...args) => event.execute(...args));
            delete require.cache[require.resolve(`./events/${file}`)];
        }
        catch(err){
            console.red(`An error has occured trying to load a event. Here is the error.`)
            console.red(err)
        }
    });
    console.green(`Events Loading complete!`)
});*/



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

bot.on("messageCreate", (msg) => {
    let prefix = ""
    if (msg.author.bot) return;
    if (msg.channel.guild){
        if (bot.settings.get(msg.member.guild.id) == undefined){
            bot.settings.set(msg.member.guild.id, {"prefix": "j!", "modlogs":"mod-logs", "welcome": false, "welcomeMessage": "Welcome to the server", "welcomeChannel" : "general", "Perm2": "Trusted", "Perm3": "Moderator", "Perm4" : "Admin", "Perm5": "Owner"});
        }
        prefix = bot.settings.get(msg.member.guild.id).prefix
    }
    else{
        prefix = "j!"
    }
    if (!msg.content.startsWith()) return;
    let command = msg.content.split(' ')[0].slice(prefix);
    let args = msg.content.split(' ').slice(1);
    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd) {
        if (cmd && !msg.channel.guild && cmd.conf.guildOnly) return msg.channel.createMessage("This command is unavailable through private messages. Please run this command in a guild.");
        try{
            cmd.run(bot, msg, args);
        }
        catch(e){
            msg.channel.createMessage({ embed: bot.errorMessage(bot, e.stack) })
        }
    }
});

//Events
bot.on('disconnect', () => {
    console.red('Bot has now Disconnected from Discord')
})

bot.on('warn', (message, id) => {
    console.yellow(`Warning: Shard ${id} - ${message}`)
})

bot.on('error', (error, id) => {
    console.red(`Error: Shard ${id} - ${error['stack']}`)

})

bot.on('shardReady', id => {
    console.green(`Shard ${id} is Now Ready`)
})

bot.on('shardResume', id => {
    console.yellow(`Shard ${id} has Resumed`)
})

bot.on('shardDisconnect', (error, id) => {
    console.red(`Shard ${id} has Disconnected` + (error ? ': ' + error.message : ''))
})

bot.connect();
app.listen(app.get('port'), function() {
    console.green('Dashboard running at Port ', app.get('port'));
});
