exports.run = async (bot, msg, args) => {
  if (msg.author.id == '236279900728721409') {
    try {
      const code = args.join(' ');
      const clean = text => {
        if (typeof(text) === 'string')
          return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        else
          return text;
      };
      let evaled = eval(code);

      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);

      const embed = new bot.RichEmbed();
      embed.setAuthor('Eval');
      embed.setDescription('Eval\'s result');
      embed.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``);
      embed.addField(':outbox_tray: Output:', `\`\`\`js\n${clean(evaled)}\n\`\`\``);
      embed.setColor(0x00afff);
      embed.setFooter('Eval', bot.user.avatarURL);
      embed.setTimestamp();
      msg.channel.createMessage({ embed });
    } catch (err) {
      msg.channel.createMessage(module.exports.error + err);
    }
  } else {
    msg.channel.createMessage('Nice Try c;');
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
