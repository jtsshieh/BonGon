exports.run = (bot, msg) => {
    if(bot.gons.get(msg.author.id) == undefined) {
        let embedToUse = bot.bank(msg, bot, 1, ['Available Gons'], [`***You have ${bot.gons.get(msg.author.id)['gons']} gons***`], [true]);
        msg.channel.createMessage({embed:embedToUse});
    }
    else{
        bot.gons.set(msg.author.id, {});
        bot.gons.get(msg.author.id)['gons'] = 0;
        bot.gons.get(msg.author.id)['daily'] = 'false';
        let embedToUse = bot.bank(msg, bot, 2, ['Note','Available Gons'], ['***Since you did not have an account, an account has been created***',`***You have ${bot.gons.get(msg.author.id)['gons']} gons***`], [true,true]);
        msg.channel.createMessage({embed:embedToUse});
    }
};
exports.conf = {
    aliases:['g'],
    guildOnly: false
};
exports.help = {
    name: 'gons',
    description: 'Displays how many gons you currently have.',
    usage: 'j!gons',
    permlevel: 0,
    category: 'Gons'
};
