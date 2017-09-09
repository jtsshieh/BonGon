const Eris = require("eris");
const fs = require('fs');
const schedule = require('node-schedule')
const config = require('./config.json')

schedule.scheduleJob({hour: 00, minute: 00}, () => {
    fs.readFile('users.json', function(err,content){
    var arrayOfObjects = JSON.parse(content)
        for (var key in arrayOfObjects) {
            arrayOfObjects[key]['daily'] = false
        }
    fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
        })
    })
})
var bot = new Eris(config.token);
var commands = {};
var functions = {};
var events = {};
var game = false;
var message = "";
var sentMessage = false;
const talkedRecently = new Set();
bot.getBotGateway().then(result => {
    let shards = result.shards;
    bot.options.maxShards = shards
});

module.exports = {
    commands:commands,
    function: functions,
    game: game,
    message: message
}

bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        console.log(`Loading Command: ${props.help.name}`);
        bot.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

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
    try{
        //Try to read all the functions in the functions folder
        fs.readdir( `./functions/`, function( err, files ) {
            if( err ) return console.error( "Could not list the directory.", err );
            files.forEach( function( file, index ) {
                functions[file.substr(0, file.lastIndexOf("."))] = require(`./functions/${file}`);
                console.log(`Loaded function ${file.substr(0, file.lastIndexOf("."))}`)
            } );
        } )
    }
    catch(e){
        console.log(e)
    }
});


bot.on("messageCreate", (msg) =>{
    if (msg.author.bot) return;
    if (!msg.content.startsWith(config.prefix)) return;
    let command = msg.content.split(' ')[0].slice(config.prefix.length);
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

bot.on('debug', (message, id) => {
    console.log(`Debug: ${id !== undefined ? 'Shard ' + id + ' - ' : ''}${message}`)
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
