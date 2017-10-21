const Eris = require('eris');
const fs = require('fs');
const schedule = require('node-schedule');
const console = require('chalk-console');

schedule.scheduleJob({hour: 0, minute: 0}, () => {
    for (let key in bot.gons) {
        bot.gons.set(key['daily'], 'false');
    }
});
var bot = new Eris(process.env.TOKEN);
bot.getBotGateway().then(result => {
    let shards = result.shards;
    bot.options.maxShards = shards;
});

bot.settings = new Eris.Collection();
bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();
bot.RichEmbed = require ('./structures/embed.js');
bot.servers = {};

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
                console.blue(`Attempting to load "${alias}" as an alias for "${command.help.name}"`, false);
            });
        }
        catch(err){
            console.red('An error has occured trying to load a command. Here is the error.');
            console.red(err.stack);
        }
    });
    console.green('Command Loading complete!');
});

fs.readdir('./functions/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} functions into the memory.`, false);
    files.forEach(file => {

        try{
            require(`./functions/${file}`)(bot);
            console.blue(`Attempting to load the function "${file.substr(0, file.lastIndexOf('.'))}".`, false);
        }
        catch(err){
            console.red('An error has occured trying to load a function. Here is the error.');
            console.red(err.stack);
        }
    });
    console.green('Function Loading complete!');
});


fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);
    console.cyan(`Attempting to load a total of ${files.length} events into the memory.`, false);
    files.forEach(file => {
        try{
            let eventName = file.split('.')[0];
            let event = require(`./events/${file}`);
            console.blue(`Attempting to load the event "${eventName}".`, false);
            bot.on(eventName, event.bind(null, bot));
            delete require.cache[require.resolve(`./events/${file}`)];
        }
        catch(err){
            console.red('An error has occured trying to load a event. Here is the error.');
            console.red(err.stack);
        }
    });
    console.green('Events Loading complete!');
});



bot.on('guildCreate', (guild) => {
    bot.settings.set(guild.id, {'prefix': 'b!', 'modlogs':'mod-logs', 'welcome': 1, 'welcomeMessage': 'Welcome to the server {mention}', 'welcomeChannel' : 'mainchat', 'Perm2': 'Trusted', 'Perm3': 'Moderator', 'Perm4' : 'Admin', 'Perm5': 'Owner'});
});

bot.on('guildMemberAdd', (guild, member) => {
    if(guild.id == '353242685961928704'){
        let role = guild.roles.find(role => role.name == 'Member');
        member.addRole(role.id);
    }
    if (bot.settings.get(guild.id) == undefined){
        bot.settings.set(guild.id, {'prefix': 'b!', 'modlogs':'mod-logs', 'welcome': 1, 'welcomeMessage': 'Welcome to the server {mention}', 'welcomeChannel' : 'mainchat', 'Perm2': 'Trusted', 'Perm3': 'Moderator', 'Perm4' : 'Admin', 'Perm5': 'Owner'});
    }
    if(!bot.settings.get(guild.id).welcome == 0 && !bot.settings.get(guild.id).welcomeMessage == ''){
        let welcome = bot.settings.get(guild.id).welcomeMessage.replace(/{user}}/gi, member.username);
        welcome = welcome.replace(/{mention}}/gi, member.mention);
        welcome = welcome.replace(/{discrim}}/gi, member.discriminator);
        let welcomeChannel = guild.channels.find(channel => channel == bot.settings.get(guild.id).welcomeChannel);
        if(welcomeChannel){
            welcomeChannel.createMessage(welcome);
        }
    }



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
bot.editStatus('online', {name: 'playing playing playing playing ', type: 0});
bot.connect();
