exports.run = async (bot, msg, args) => {
  if (!msg.author.id == '236279900728721409') return msg.channel.createMessage('Nice Try');

  let evaled;

  let remove;
  let code;

  try {
    code = args.join(' ');
    remove = text => {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    };

    evaled = eval(code);

    if (typeof evaled !== 'string')
      evaled = require('util').inspect(evaled);
  } catch (err) {
    const embed = new bot.RichEmbed();
    embed.setAuthor('Eval Error');
    embed.setDescription('Eval\'s result');
    embed.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false);
    embed.addField(':outbox_tray: Output:', `\`\`\`${err.stack}\`\`\``, false);
    embed.setColor(0xff0000);
    embed.setFooter('Eval', bot.user.avatarURL);
    embed.setTimestamp();
    return msg.channel.createMessage({ embed });
  }


  try  {
    const embed = new bot.RichEmbed();
    embed.setAuthor('Eval Success');
    embed.setDescription('Eval\'s result');
    embed.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false);
    embed.addField(':outbox_tray: Output:', `\`\`\`js\n${remove(evaled)}\n\`\`\``, false);
    embed.setColor(0x00afff);
    embed.setFooter('Eval', bot.user.avatarURL);
    embed.setTimestamp();
    return msg.channel.createMessage({ embed });
  } catch (err) {
    const embed = new bot.RichEmbed();
    embed.setAuthor('Eval Error');
    embed.setDescription('Eval\'s result');
    embed.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``, false);
    embed.addField(':outbox_tray: Output:', `\`\`\`${err.stack}\`\`\``, false);
    embed.setColor(0xff0000);
    embed.setFooter('Eval', bot.user.avatarURL);
    embed.setTimestamp();
    return msg.channel.createMessage({ embed });
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
