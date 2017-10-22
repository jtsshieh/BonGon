module.exports = async (bot, msg) => {
    let prefix = '';
    if (msg.author.bot) return;
    if (msg.channel.guild){
        if (bot.settings.get(msg.channel.guild.id) == undefined){
            bot.settings.set(msg.channel.guild.id, {'prefix': 'b!', 'modlogs':'mod-logs', 'welcome': 1, 'welcomeMessage': 'Welcome to the server {mention}', 'welcomeChannel' : 'mainchat', 'Perm2': 'Trusted', 'Perm3': 'Moderator', 'Perm4' : 'Admin', 'Perm5': 'Owner'});
        }
        prefix = bot.settings.get(msg.channel.guild.id).prefix;
    }
    else{
        prefix = 'b!';
    }
    if (!msg.content.startsWith(prefix))return;
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift();
    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd) {
        if(cmd.conf.guildOnly == true){
            if(!msg.channel.guild){
                return await msg.channel.createMessage('This command can only be ran in a guild.');
            }
        }
        try{
            await msg.channel.sendTyping();
            cmd.run(bot, msg, args, prefix);
        }
        catch(e){
            await msg.channel.createMessage({ embed: bot.errorMessage(bot, e.stack) });
        }
    }
};
