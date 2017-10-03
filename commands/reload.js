exports.run = (bot, msg, args) => {
    if (!args.length) return msg.channel.createMessage('Must provide a command to reload.').then(m => {
        setTimeout(function() {
            m.delete();
        }, 5000);
    });
    if (msg.author.id == '236279900728721409') {
        let command;
        if (bot.commands.has(args[0])) {
            command = args[0];
        } else if (bot.aliases.has(args[0])) {
            command = bot.aliases.get(args[0]);
        }
        if (!command) {
            return msg.channel.createMessage(`I cannot find the command: ${args[0]}`).then(m => {
                setTimeout(function() {
                    m.delete();
                }, 5000);
            });
        } else {
            msg.channel.createMessage(`Reloading: ${command}`)
                .then(m => {
                    bot.reload(command)
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
    aliases: ['r'],
    guildOnly: false
};
exports.help = {
    name: 'reload',
    description: 'Reloads other commands/functions.',
    usage: 'reload <type:args[0]> <name:name>',
    permlevel: 11,
    category: 'Owner'
};
