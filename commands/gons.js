const Eris = require('eris');
const fs = require('fs');
exports.run = (bot, msg, args) => {
    if(!bot.gons.get(msg.author.id)) {
        var embedToUse = bot.bank(msg, bot, 1, ['Available Gons'], [`***You have ${bot.gons.get(msg.author.id)['gons']} gons***`], [true])
        msg.channel.createMessage({embed:embedToUse})
    }
    else{
        bot.gons.set(msg.author.id, {});
        bot.gons.get(msg.author.id)['gons'] = 0;
        bot.gons.get(msg.author.id)['daily'] = false;
        var embedToUse = bank.bank(msg, bot, 2, ['Note','Available Gons'], ['***Since you did not have an account, an account has been created***',`***You have ${bot.gons.get(msg.author.id)['gons']} gons***`], [true,true])
        msg.channel.createMessage({embed:embedToUse})
    }
}
exports.conf = {
    aliases:['g'],
    guildOnly: false
}
exports.help = {
    name: 'gons',
    description: 'Displays how many gons you currently have.',
    usage: 'j!gons',
    permlevel: 0,
    category: 'Gons'
}
