exports.run = async (bot, msg, args) => {
    if (!args.length) return await msg.channel.createMessage('Must provide a command/function to reload.').then(m => {
        setTimeout(function() {
            m.delete();
        }, 5000);
    });
    if (msg.author.id == '236279900728721409') {
        switch(args[0]){
            case 'command':
                handleCommand(bot, msg, args);
                break;
            case 'function':
                handleFunction(bot, msg, args);
                break;
            default:
                msg.channel.createMessage('Type is invalid or none was specified.')
        }

    }

};
async function handleFunction(bot, msg, args){
    let func;
    if (bot.functions.has(args[1])) {
        func = args[1];
    }
    if (!func) {
        return await msg.channel.createMessage(`I cannot find the function: ${args[1]}`).then(m => {
            setTimeout(function() {
                m.delete();
            }, 5000);
        });
    } else {
        await msg.channel.createMessage(`Reloading: ${func}`)
            .then(m => {
                bot.reload(func, 'function')
                    .then(() => {
                        m.edit(`Successfully reloaded the function: ${func}`).then(m => {
                            setTimeout(function() {
                                m.delete();
                            }, 5000);
                        });
                    })
                    .catch(e => {
                        m.edit(`Function reload failed: ${func}\n\`\`\`${e.stack}\`\`\``);
                    });
            });
    }
}

async function handleCommand(bot, msg, args){
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
