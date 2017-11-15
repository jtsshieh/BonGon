exports.run = async (bot, msg, args) => {
  //Check if author id is good
  if (msg.author.id != '236279900728721409') return msg.channel.createMessage('Nice Try');

  const code = args.join(' ');

  let evaled;
  let remove;

  //Attempt to eval code
  try {
    //Remove all discord things
    remove = text => {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    };

    //Eval the code and set the result
    evaled = eval(code);

    //If it is a string, inspect it
    if (typeof evaled !== 'string')
      evaled = require('util').inspect(evaled);

  } catch (err) {
    //If eval has failed setup new embed
    const embed = new bot.RichEmbed()
      .setAuthor('Eval Error')
      .setDescription('Eval\'s result')
      .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false)
      .addField(':outbox_tray: Output:', `\`\`\`${err.stack}\`\`\``, false)
      .setColor(0xff0000)
      .setFooter('Eval', bot.user.avatarURL)
      .setTimestamp();
    //Send the embed
    return msg.channel.createMessage({
      embed
    });
  }


  //Attempt to build the embeds
  try {
    //Build the success embed
    const embed = new bot.RichEmbed()
      .setAuthor('Eval Success')
      .setDescription('Eval\'s result')
      .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false)
      .addField(':outbox_tray: Output:', `\`\`\`js\n${remove(evaled)}\n\`\`\``, false)
      .setColor(0x00afff)
      .setFooter('Eval', bot.user.avatarURL)
      .setTimestamp();

    //Send the embed
    return msg.channel.createMessage({
      embed
    });
  } catch (err) {
    //If failed, build the failure embed
    const embed = new bot.RichEmbed()
      .setAuthor('Eval Error')
      .setDescription('Eval\'s result')
      .addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false)
      .addField(':outbox_tray: Output:', `\`\`\`${err.stack}\`\`\``, false)
      .setColor(0xff0000)
      .setFooter('Eval', bot.user.avatarURL)
      .setTimestamp();

    //And send it
    return msg.channel.createMessage({
      embed
    });
  }
};

exports.conf = {
  aliases: [],
  guildOnly: false
};

exports.help = {
  name: 'eval',
  description: 'Eval JavaScript Code.',
  usage: 'eval',
  permlevel: 0,
  category: 'Owner'
};
