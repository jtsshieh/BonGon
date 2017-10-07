exports.run = (bot, msg, args) => {
    let server = bot.setUpVariables(msg);
    if (args.length) {
        let args2 = Number(args[1]);
        switch (args[0]) {
            case 'remove':
                if (!bot.servers[msg.member.guild.id]) bot.servers[msg.member.guild.id] = {
                    queue: [],
                    queueTitle: []
                };
                bot.servers[msg.member.guild.id].queue.splice(args2 - 1, 1);
                bot.servers[msg.member.guild.id].queueTitle.splice(args2 - 1, 1);
                break;
            case 'r':
                if (!bot.servers[msg.member.guild.id]) bot.servers[msg.member.guild.id] = {
                    queue: [],
                    queueTitle: []
                };
                bot.servers[msg.member.guild.id].queue.splice(args2 - 1, 1);
                bot.servers[msg.member.guild.id].queueTitle.splice(args2 - 1, 1);
                break;
        }
    }
    let embed = new bot.RichEmbed();
    embed.setTitle('Queue');
    embed.setAuthor(bot.user.username, bot.user.avatarURL);
    embed.setColor(0x00afff);
    embed.setDescription('The queue for this server');
    embed.setTimestamp();
    let number = 0;
    let songs = '';
    server.queueTitle.forEach(function(x) {
        number++;
        songs += number + '. ' + x + '\n';
    });
    if (songs == '') {
        songs = '*There are no songs queued!*';
    }
    embed.addField('Songs', songs);
    return msg.channel.createMessage({
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
