exports.run = async (bot, msg, args, prefix) => {
  if (!args[0]) {
    //Define Variables
    const categories = [];
    const commands = Array.from(bot.commands.keys());

    //Iterate though command and get categories
    commands.forEach(function(x) {
      if (!categories.includes(bot.commands.get(x).help.category)) {
        categories.push(bot.commands.get(x).help.category);
      }
    });

    //Setup Embed
    const embed = new bot.RichEmbed()
      .setTitle('BonGon Help')
      .setDescription(`To view help for a specific command, type ${prefix}help`)
      .setAuthor('BonGon', bot.user.avatarURL)
      .setColor(0x00afff)
      .setFooter(`The prefix for the server is ${prefix}`)
      .setTimestamp();

    //Iterate through categories and build categories
    categories.forEach(function(x) {
      let cat = '';
      commands.forEach(function(command) {
        if (bot.commands.get(command).help.category == x) {
          cat = cat + command + '\n';
        }
      });
      embed.addField(x, cat);
    });

    //Send
    await msg.channel.createMessage({
      embed
    });
  } else {
    let command;

    //Setup embed
    const embed = new bot.RichEmbed()
      .setAuthor('BonGon', bot.user.avatarURL)
      .setFooter('Parameter wrapped in () are optional. Parameters wrapped in <> are required.')
      .setTimestamp();

    //Attempt to get the command
    if (bot.commands.has(args[0])) {
      command = args[0];
    } else if (bot.aliases.has(args[0])) {
      command = bot.aliases.get(args[0]);
    } else {
      embed.setTitle('Error');
      embed.setColor(0xff0000);
      embed.addField('Command not found', `The command ${args[0]} was not found in the system. Type ${prefix}help for help`);
    }

    if (command) {
      //Get the command object
      const commands = bot.commands.get(command);

      //Setup embed
      embed.setTitle(`Help for the command ${args[0]}`);
      embed.setColor(0x00afff);
      embed.addField('Command', command);
      embed.addField('Usage', prefix + commands.help.usage);
      embed.addField('Perm Level', commands.help.permlevel);

      let aliases = '';

      //Iterate through command's aliases
      for (let x = 0; x < commands.conf.aliases.length - 1; x++) {
        aliases += commands.conf.aliases[x] + ', ';
      }

      //Find the last Alias and place it
      const lastAlias = commands.conf.aliases[commands.conf.aliases.length - 1];

      //Check if there are no aliases
      if (lastAlias == undefined) {
        embed.addField('Aliases', '*None*');
      } else {
        embed.addField('Aliases', aliases + lastAlias);
      }
      //Add the description
      embed.addField('Description', commands.help.description);
    }

    //Send the embed
    await msg.channel.createMessage({
      embed
    });
  }
};
exports.conf = {
  aliases: ['h'],
  guildOnly: false
};
exports.help = {
  name: 'help',
  description: 'Displays all the commands or a page with information for 1 command.',
  usage: 'help (command:command-name)',
  permlevel: 0,
  category: 'Other'
};
