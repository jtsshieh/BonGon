exports.run = (bot, msg, args) => {
    let embed = new bot.RichEmbed();
    let prefix = bot.settings.get(msg.channel.guild.id).prefix;
    if (!args[0]) {
        let categories = [];
        let commands = Array.from(bot.commands.keys());
        commands.forEach(function (x){
            if(!categories.includes(bot.commands.get(x).help.category)){
                categories.push(bot.commands.get(x).help.category);
            }
        });
        let embed = new bot.RichEmbed();
        categories.forEach(function(x){
            let cat = '';
            commands.forEach(function (command){
                if(bot.commands.get(command).help.category == x){
                    cat = cat + command + '\n';
                }
            });
            embed.addField(x,cat);
        });
        embed.setTitle('BonGon Help');
        embed.setDescription(`To view help for a specific command, type ${prefix}help`);
        embed.setAuthor('BonGon', bot.user.avatarURL);
        embed.setColor(0x00afff);
        embed.setFooter(`The prefix for the server is ${prefix}`);
        embed.setTimestamp();
        msg.channel.createMessage({embed});
    } else{
        let command;
        if (bot.commands.has(args[0])) {
            command = args[0];
        } else if (bot.aliases.has(args[0])) {
            command = bot.aliases.get(args[0]);
        } else{
            embed.setTitle('Error');
            embed.setAuthor('BonGon', bot.user.avatarURL);
            embed.setColor(0xff0000);
            embed.addField('Command not found', `The command ${args[0]} was not found in the system. Type ${prefix}help for help`);
            embed.setFooter('Parameter wrapped in () are optional. Parameters wrapped in <> are required.');
            embed.setTimestamp();
        }
        if(command){
            let commands = bot.commands.get(command);
            embed.setTitle(`Help for the command ${args[0]}`);
            embed.setAuthor('BonGon', bot.user.avatarURL);
            embed.setColor(0x00afff);
            embed.addField('Command', command);
            embed.addField('Usage', prefix + commands.help.usage);
            embed.addField('Perm Level', commands.help.permlevel);
            let aliases = '';
            for(let x = 0; x < commands.conf.aliases.length - 1; x++){
                aliases += commands.conf.aliases[x] + ', ';
            }
            let lastAlias = commands.conf.aliases[commands.conf.aliases.length - 1];
            if(lastAlias == undefined){
                embed.addField('Aliases', '*None*');
            }
            else{
                embed.addField('Aliases', aliases + lastAlias);
            }
            embed.addField('Description', commands.help.description);
            embed.setFooter('Parameter wrapped in () are optional. Parameters wrapped in <> are required.');
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
    usage: 'help (command:command-name)',
    permlevel: 0,
    category: 'Other'
};
