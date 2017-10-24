exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  if (!server) return await msg.channel.createMessage('There is nothing to stop');
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing to stop');
  let tempserver = server;
  server.dispatcher.stopPlaying();
  bot.servers[msg.member.guild.id] = null;
  bot.leaveVoiceChannel(tempserver.dispatcher.channelID);
  tempserver = {};
  await msg.channel.createMessage('Stopped the song and cleared the queue.');
};

exports.conf = {
  aliases: [],
  guildOnly: true
};

exports.help = {
  name: 'stop',
  description: 'Stops the music, and clears the queue.',
  usage: 'stop',
  permlevel: 0,
  category: 'Music'
};
