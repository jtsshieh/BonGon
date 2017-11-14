exports.run = async (bot, msg) => {
  //Build embed
  const embed = new bot.RichEmbed()
    .setTitle('About BonGon')
    .setDescription('A few important things')
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setColor(0x00afff)
    .addField('Licence', 'BonGon is licenced under the MIT licence')
    .addField('Privacy Policy', 'You agree that this bot will use you and your guild members information to enhance your expierience. If you do not agree to this, either kick the bot off your guild or leave the guild with the bot.')
    .addField('Credits', 'Creator: jtsshieh#6242 \nLibrary: Eris \nA HUGE Helper: ElJay #7711 \non the Unofficial Discord API server')
    .setTimestamp();

  //If in a guild, display shard id
  if (msg.channel.guild) {
    embed.addField('Shard Id', msg.member.guild.shard.id);
  }

  //Send
  await msg.channel.createMessage({
    embed
  });
};
exports.conf = {
  aliases: [],
  guildOnly: false
};
exports.help = {
  name: 'about',
  description: 'Displays the about page',
  usage: 'about',
  permlevel: 0,
  category: 'Other'
};
