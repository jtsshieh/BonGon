exports.run = async (bot, msg, args, prefix) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  //Check if there is something playing
  if (!server) return await msg.channel.createMessage('There is nothing to pause');
  //Check if there is a dispatcher
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing playing');
  //Check if there if it is already paused
  if (!server.nowPlaying.playing) return await msg.channel.createMessage(`The song is already paused. Try typing ${prefix}resume`);

  //Pause it and set playing to false
  server.dispatcher.pause();
  server.nowPlaying.playing = false;

  //Emit the paused event
  bot.musicEmit.emit('paused');

  //Send the message
  await msg.channel.createMessage('Paused the song');
};

exports.conf = {
  aliases: [],
  guildOnly: true
};

exports.help = {
  name: 'pause',
  description: 'Pauses the music.',
  usage: 'pause',
  permlevel: 0,
  category: 'Music'
};
