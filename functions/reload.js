module.exports = (bot) => {
  bot.reload = (item) => {
    return new Promise((resolve, reject) => {
      try {
        const cmd = require(`./commands/${item}`);
        delete require.cache[require.resolve(`./commands/${item}.js`)];
        bot.commands.delete(item);
        bot.aliases.forEach((cmd, alias) => {
          if (cmd === item) bot.aliases.delete(alias);
        });
        bot.commands.set(item, cmd);
        cmd.conf.aliases.forEach(alias => {
          bot.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
};
