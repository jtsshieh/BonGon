exports.run = async (bot, msg, args) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    if (args.length) {
        let args2 = Number(args[1]);
        switch (args[0]) {
            case 'remove':
                server.queue.splice(args2 - 1, 1);
                break;
            case 'r':
                server.queue.splice(args2 - 1, 1);
                break;
            case 'repeat':
                if(!server.repeat){
                    server.queue.repeat = true;
                    msg.channel.createMessage('Repeat is now on!');
                }
                else{
                    server.repeat = false;
                    msg.channel.createMessage('Repeat is now off!');
                }

                return;
        }
    }
    let embed = new bot.RichEmbed();
    embed.setTitle(`${msg.member.guild.name}'s queue`);
    embed.setAuthor(bot.user.username, bot.user.avatarURL);
    embed.setColor(0x00afff);
    embed.setDescription('The queue for this server');
    embed.setTimestamp();
    let number = 0;
    let songs = '';
    server.queue.forEach(function(x) {
        let moment = require('moment');
        let s = moment.duration({s: x.duration});
        let totTime = moment().startOf('day').add(s).format('HH:mm:ss');
        number++;
        songs += number + '. ' + x.title + '** - **' + totTime + '** - **' + 'Requested By: ' + x.requested + '\n';
    });
    if (songs == '') {
        songs = '*There are no songs queued!*';
    }
    embed.addField('Songs', songs);
    return await msg.channel.createMessage({
        embed
    });
};
exports.conf = {
    aliases: ['q'],
    guildOnly: true
};
exports.help = {
    name: 'queue',
    description: 'View this server\'s queue, or modify it.',
    usage: 'queue (text:remove)',
    permlevel: 0,
    category: 'Music'
};
