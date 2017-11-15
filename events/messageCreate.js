module.exports = async (bot, msg) => {
  if (msg.channel.permissionsOf(bot.user.id).has('sendMessages')) {
    bot.handleCommand(msg, bot);
  }
  else {
    return;
  }
};
