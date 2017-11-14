exports.run = async (bot, msg) => {
  //Send a lag message to get times
  const m = await msg.channel.createMessage('If you see this, the bot is lagging').then(m => { // eslint-disable-line no-unused-vars
    //Build the embed with shard and server/client info
    const embed = new bot.RichEmbed()
      .setTitle('PONG!!')
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(0x00aff)
      .addField('Shard Latency (Server)', msg.member.guild.shard.latency.toString() + 'ms')
      .addField('Bot Latency (Client)', `${m.timestamp - msg.timestamp} ms`)
      .addField('Shard Id', msg.member.guild.shard.id)
      .setTimestamp();

    //Send the embed
    msg.channel.createMessage({
      embed
    });

    //Delete the useless lag message
    m.delete();
  });
};
exports.conf = {
  aliases: [],
  guildOnly: false
};
exports.help = {
  name: 'ping',
  description: 'Displays Server Latency, Client Latency, and Shard Info.',
  usage: 'ping',
  permlevel: 0,
  category: 'Other'
};
