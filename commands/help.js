exports.run = (bot, msg, args) => {
    let embed = new bot.RichEmbed();
    let prefix = bot.settings.get(msg.channel.guild.id).prefix;
    if (!args[0]) {
        //
    } else{
        let command = args[0];
        if (bot.commands.has(command)) {
            let commands = bot.commands.get(command);
            embed.setTitle(`Help for the command ${args[0]}`);
            embed.setAuthor('BonGon', bot.user.avatarURL);
            embed.setColor(0x00afff);
            embed.addField('Command', args[0]);
            embed.addField('Usage', prefix + commands.help.usage);
            embed.addField('Perm Level', commands.help.permlevel);
            embed.addField('Description', commands.help.description);
            embed.setFooter('Parameter wrapped in () are optional. Parameters wrapped in <> are required.');
        }
        else{
            embed.setTitle('Error');
            embed.setAuthor('BonGon', bot.user.avatarURL);
            embed.setColor(0x00afff);
            embed.addField('Command not found', `The command ${args[0]} was not found in the system. Type j!help for help`);
            embed.setFooter('Parameter wrapped in () are optional. Parameters wrapped in <> are required.');
            embed.setTimestamp();
        }
        msg.channel.createMessage( {embed} );
    }
};
exports.conf = {
    aliases:['h'],
    guildOnly: false
};
exports.help = {
    name: 'help',
    description: 'Displays all the commands or a page with information for 1 command.',
    usage: 'help (command)',
    permlevel: 0,
    category: 'Other'
};
