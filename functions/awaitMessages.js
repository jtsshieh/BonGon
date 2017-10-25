module.exports = (bot) =>{
  bot.awaitMessage = async (content) => {
    const callback = (msg) => {
      if (!content) {
        bot.removeListener('messageCreate', callback);
        return msg.content;
      }
      if (content.typeof(String)) {
        if (msg.content == content) {
          return msg.content;
        }
      }
      else if (content.typeof(Array)) {
        if (content.includes(msg.content)) {
          return content.find(e => e == msg.content);
        }
      }
    };

    bot.on('messageCreate', callback);

  };
};
