exports.run = (bot, msg, args) => {
    if (!args[0]) {
        let embed = {
            title: 'Help',
            description: `Commands start with ${bot.settings.get(msg.member.channel.id).prefix}`,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            color: 0x00afff,
            fields: [

            ],
            footer: {
                text: 'To view help for a specific command, type ${config.prefix}help [command]'
            }
        };

        /*for(var key in bot.commands.keys()){
            var obj = bot.commands.get(key);
            console.log(bot.commands)
            for (var prop in obj) {
                if (prop != 'run') {
                    matched = false;
                    for(var i in categories) {
                       if (categories[i] == bot.commands.keys().help.category) {
                          matched = true;
                       }
                    }

                    if (!matched) {
                       categories.push(bot.commands.keys().help.category);
                    }
                }
            }
        }
        for (var category in categories) {
            var value = ''
            for(var key in bot.commands.keys()){
                var obj = bot.commands.keys()
                for (var prop in obj){
                    if (prop != 'run') {
                        if (bot.commands.keys().help.category === categories[category]){
                            value = value + key + '\n'
                        }
                    }
                }
            }
            var tempdict = {name: categories[category], value: value, inline: true}
            embeds.fields.push(tempdict)
        }*/
        msg.channel.createMessage( {embed} );
    } else{
        let command = args[0];
        if (bot.commands.has(command)) {
            let commands = bot.commands.get(command);
            var embed = {};
            embed = {
                title: `Help for the command ${args[0]}`,
                author: {
                    name: 'BonGon',
                    icon_url: bot.user.avatarURL
                },
                color: 0x00afff,
                fields: [
                    {
                        name: 'Command',
                        value: args[0],
                        inline:true
                    },
                    {
                        name: 'Usage',
                        value: commands.help.usage,
                        inline:true
                    },
                    {
                        name:'Perm Level',
                        value: commands.help.permlevel,
                        inline:true
                    },
                    {
                        name: 'Description',
                        value: commands.help.description,
                        inline: true
                    }
                ],
                footer: {
                    text: 'Parameter wrapped in () are optional. Parameters wrapped in <> are required.'
                }
            };
        }
        else{
            embed = {
                title: 'Error',
                author: {
                    name: 'BonGon',
                    icon_url: bot.user.avatarURL
                },
                color: 0xff0000,
                fields: [
                    {
                        name: 'Command not found',
                        value: `The command ${args[0]} was not found in the system. Type j!help for help`,
                        inline:true
                    }
                ],
                footer: {
                    text: 'Parameter wrapped in () are optional. Parameters wrapped in <> are required.'
                }
            };
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
    usage: 'j!help (command)',
    permlevel: 0,
    category: 'Other'
};
