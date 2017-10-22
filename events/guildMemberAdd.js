module.exports = async (bot, guild, member) => {
    if(guild.id == '353242685961928704'){
        let role = guild.roles.find(role => role.name == 'Member');
        member.addRole(role.id);
    }
    if (bot.settings.get(guild.id) == undefined){
        bot.settings.set(guild.id, {'prefix': 'b!', 'modlogs':'mod-logs', 'welcome': 0, 'welcomeMessage': 'Welcome to the server {mention}', 'welcomeChannel' : 'mainchat', 'Perm2': 'Trusted', 'Perm3': 'Moderator', 'Perm4' : 'Admin', 'Perm5': 'Owner'});
    }
    if(!bot.settings.get(guild.id).welcome == 0 && !bot.settings.get(guild.id).welcomeMessage == ''){
        let welcome = bot.settings.get(guild.id).welcomeMessage.replace(/{user}}/gi, member.username);
        welcome = welcome.replace(/{mention}}/gi, member.mention);
        welcome = welcome.replace(/{discrim}}/gi, member.discriminator);
        let welcomeChannel = guild.channels.find(channel => channel == bot.settings.get(guild.id).welcomeChannel);
        if(welcomeChannel){
            await welcomeChannel.createMessage(welcome);
        }
    }
};
