const Eris = require("eris");
const fs = require('fs');
const bank = require("../functions/bank.js")
exports.run = (bot, msg, args) => {
            if(bot.settings.get(msg.author.id) != undefined) {
                var embedToUse = bank.bank(msg, bot, 1, ["Available Gons"], [`***You have ${bot.settings.get(msg.author.id)['gons']} gons***`], [true])
                msg.channel.createMessage({embed:embedToUse})
            }
            else{
                bot.settings.set(msg.author.id, {});
                bot.settings.get(msg.author.id)['gons'] = 0;
                bot.settings.get(msg.author.id)['daily'] = false;
                var embedToUse = bank.bank(msg, bot, 2, ["Note","Available Gons"], ["***Since you did not have an account, an account has been created***",`***You have ${bot.settings.get(msg.author.id)['gons']} gons***`], [true,true])
                msg.channel.createMessage({embed:embedToUse})
            }
}
exports.conf = {
    aliases:["g"]
}
exports.help = {
    name: "gons",
    description: "Displays how many gons you currently have.",
    usage: "j!gons",
    permlevel: 0,
    category: "Gons"
}
