exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  //Check if there is a server
  if (!server) return await msg.channel.createMessage('There is nothing to stop');
  //Check if there is a dispatcher
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing to stop');
  //Store the server in a variable
  let tempserver = server;
  //Stop the dispatcher
  server.dispatcher.stopPlaying();
  //Erase the server
  bot.servers[msg.member.guild.id] = null;
  //Leave the voice channel
  bot.leaveVoiceChannel(tempserver.dispatcher.channelID);
  //Clear tempserver
  tempserver = {};
  //Send a message about that
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
