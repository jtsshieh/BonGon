exports.run = async (bot, msg) => {
    const m = await msg.channel.createMessage('If you see this, the bot is lagging').then(m => { // eslint-disable-line no-unused-vars
        let embed = new bot.RichEmbed();
        embed.setTitle('PONG!!');
        embed.setAuthor(msg.author.username, msg.author.avatarURL);
        embed.setColor(0x00aff);
        embed.addField('Shard Latency (Server)', msg.member.guild.shard.latency.toString() + 'ms');
        embed.addField('Bot Latency (Client)', `${m.timestamp - msg.timestamp} ms`);
        embed.addField('Shard Id', msg.member.guild.shard.id);
        embed.setTimestamp();
        msg.channel.createMessage( { embed } );
        m.delete();
    });
};
exports.conf = {
    aliases:[],
    guildOnly: false
};
exports.help = {
    name: 'ping',
    description: 'Displays Server Latency, Client Latency, and Shard Info.',
    usage: 'ping',
    permlevel: 0,
    category: 'Other'
};
