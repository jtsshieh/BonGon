module.exports = async (bot, msg) => {
  if (msg.channel.permissionOf(bot.user.id).has('sendMessages')) {
    bot.handleCommand(msg);
  }
  else {
    return;
  }
};
