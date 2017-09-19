exports.run = (bot, msg) => {
    if(!bot.gons.get(msg.author.id) != undefined) {
        if(bot.gons.get(msg.author.id)['daily'] == false){
            bot.gons.get(msg.author.id)['gons'] +=100;
            bot.gons.get(msg.author.id)['daily'] = true;
            let embedToUse = bot.bank(msg, bot, 2, ['Gons Revieved','New Balance'], ['***You have recived 100 gons from the bank for your daily payout***', `***Your new balance is ${bot.gons.get(msg.author.id)['gons']} gons***`], [true,true]);
            msg.channel.createMessage({embed:embedToUse});
        }
        else{
            let embedToUse = bot.bank(msg, bot, 2, ['Reject','Balance'], ['***You have already recived your daily gons, check back tomorrow (UTC-4 DST EST or UTC-5 EST) to get your next payout***', `***Your current balance is ${bot.gons.get(msg.author.id)['gons']} gons***`], [true,true]);
            msg.channel.createMessage({embed:embedToUse});
            return;
        }
    }
    else{
        bot.gons.set(msg.author.id, {});
        bot.gons.get(msg.author.id)['gons'] = 100;
        bot.gons.get(msg.author.id)['daily'] = true;
        let embedToUse = bot.bank(msg, bot, 3, ['Note','Gons Recieved','New Balance'], ['***Since you did not have an account, an account has been created***' ,'***You have recived 100 gons from the bank for your daily payout.***', `***Your new balance is ${bot.gons.get(msg.author.id)['gons']} gons***`], [true, true,true]);
        msg.channel.createMessage({embed:embedToUse});
    }
};
exports.conf = {
    aliases:[],
    guildOnly: false
};
exports.help = {
    name: 'daily',
    description: 'Collects your daily gons if they are available.',
    usage: 'j!daily',
    permlevel: 0,
    category: 'Gons'
};
