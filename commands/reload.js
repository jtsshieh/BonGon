exports.run = async (bot, msg, args) => {
  //Check if there isn't an arg
  if (!args.length) return await msg.channel.createMessage('Must provide a command/function to reload.').then(m => {
    setTimeout(function() {
      m.delete();
    }, 5000);
  });

  //Make sure its the owner
  if (msg.author.id == '236279900728721409') {

    let command;

    //Check if there is a command under that name
    if (bot.commands.has(args[1])) {
      command = args[1];
    } else if (bot.aliases.has(args[1])) {
      command = bot.aliases.get(args[1]);
    }

    if (!command) {
      //Tell user that there is no command and delete that in 5 seconds
      return await msg.channel.createMessage(`I cannot find the command: ${args[1]}`).then(m => {
        setTimeout(function() {
          m.delete();
        }, 5000);
      });

    } else {
      //Say reloading
      await msg.channel.createMessage(`Reloading: ${command}`)
        .then(m => {
          //Reload the command
          bot.reload(command, 'command')
            .then(() => {
              //Edit the message saying it is reloaded and delete within 5 seconds
              m.edit(`Successfully reloaded the command: ${command}`).then(m => {
                setTimeout(function() {
                  m.delete();
                }, 5000);
              });
            })
            .catch(e => {
              //Otherwise, say it failed with the stack trace
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
