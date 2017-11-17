module.exports = async (bot, msg) => {
  const prefix = 'b!';
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let cmd;
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  if (cmd) {
    if (cmd.conf.guildOnly == true) {
      if (!msg.channel.guild) {
        return await msg.channel.createMessage('This command can only be ran in a guild.');
      }
    }
    try {
      await msg.channel.sendTyping();
      cmd.run(bot, msg, args, prefix);
    }
    catch (e) {
      await msg.channel.createMessage({ embed: bot.errorMessage(bot, e.stack) });
    }
  }
};
