module.exports = (bot) => {
    bot.reload = (item, type) => {
        return new Promise((resolve, reject) => {
            try {
                let cmd = require(`./commands/${item}`);
                let func = require(`../functions/${item}`)(bot);
                switch(type){
                    case 'command':
                        delete require.cache[require.resolve(`./commands/${item}`)];
                        bot.commands.delete(item);
                        bot.aliases.forEach((cmd, alias) => {
                            if (cmd === item) bot.aliases.delete(alias);
                        });
                        bot.commands.set(item, cmd);
                        cmd.conf.aliases.forEach(alias => {
                            bot.aliases.set(alias, cmd.help.name);
                        });
                        resolve();
                        break;
                    case 'function':
                        delete require.cache[require.resolve(`./functions/${func}`)];
                        require(`../functions/${func}`)(bot);
                        resolve();
                        break;
                }
            } catch (e){
                reject(e);
            }
        });
    };
};
