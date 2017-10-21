module.exports = (bot, guild) => {
    bot.settings.set(guild.id, {'prefix': 'b!', 'modlogs':'mod-logs', 'welcome': 1, 'welcomeMessage': 'Welcome to the server {mention}', 'welcomeChannel' : 'mainchat', 'Perm2': 'Trusted', 'Perm3': 'Moderator', 'Perm4' : 'Admin', 'Perm5': 'Owner'});
};
