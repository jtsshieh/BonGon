exports.run = async (bot, msg, args) => {
    if (!args.length) return await msg.channel.createMessage('Must provide a command/function to reload.').then(m => {
        setTimeout(function() {
            m.delete();
        }, 5000);
    });
    if (msg.author.id == '236279900728721409') {
        let command;
        if (bot.commands.has(args[1])) {
            command = args[1];
        } else if (bot.aliases.has(args[1])) {
            command = bot.aliases.get(args[1]);
        }
        if (!command) {
            return await msg.channel.createMessage(`I cannot find the command: ${args[1]}`).then(m => {
                setTimeout(function() {
                    m.delete();
                }, 5000);
            });
        } else {
            await msg.channel.createMessage(`Reloading: ${command}`)
                .then(m => {
                    bot.reload(command, 'command')
                        .then(() => {
                            m.edit(`Successfully reloaded the command: ${command}`).then(m => {
                                setTimeout(function() {
                                    m.delete();
                                }, 5000);
                            });
                        })
                        .catch(e => {
                            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
                        });
                });
        }
    }
};
exports.conf = {
    aliases: ['r', 'load'],
    guildOnly: false
};
exports.help = {
    name: 'reload',
    description: 'Reloads other commands/functions.',
    usage: 'reload <type:command/function> <name:name>',
    permlevel: 11,
    category: 'Owner'
};
