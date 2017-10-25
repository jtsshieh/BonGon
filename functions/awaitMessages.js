module.exports = (bot) =>{
  bot.awaitMessage = async (content) => {
    const callback = (msg) => {
      if (!content) {
        bot.removeListener('messageCreate', callback);
        return msg.content;
      }
      if (typeof content == 'string') {
        if (msg.content == content) {
          return msg.content;
        }
      }
      else if (typeof content == 'object') {
        if (content.includes(msg.content)) {
          return msg.content;
        }
      }
    };

    bot.on('messageCreate', callback);

  };
};
