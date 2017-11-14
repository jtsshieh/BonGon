exports.run = async (bot, msg, args, prefix) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  //Check if there is something playing
  if (!server) return await msg.channel.createMessage('There is nothing to resume');
  //Check if there is a dispatcher
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing to resume');
  //Check if there if it is already playing
  if (server.nowPlaying.playing) return await msg.channel.createMessage(`You can't resume a song that is already playing. Try ${prefix}pause`);

  //Resume it and set playing to true
  server.dispatcher.resume();
  server.nowPlaying.playing = true;

  //Emit the resume event
  bot.musicEmit.emit('resumed');

  //Send the message
  await msg.channel.createMessage('Resumed the song');
};

exports.conf = {
  aliases: [],
  guildOnly: true
};

exports.help = {
  name: 'resume',
  description: 'Resumes the music.',
  usage: 'resume',
  permlevel: 0,
  category: 'Music'
};
