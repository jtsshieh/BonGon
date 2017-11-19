exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  if (!server.nowPlaying) return await msg.channel.createMessage('There is nothing currently playing');

  //Get current and totalTime
  const currentTime = Math.floor(server.dispatcher ? server.dispatcher.time / 60 : 0);
  const totalTime = Math.floor(server.nowPlaying.duration / 60);
  //Find time left
  let timeLeft = Math.floor(currentTime / totalTime * 20);

  //Build the player
  const embed = new bot.RichEmbed()
    .setTitle('Now Playing | Beat Music Player')
    .setAuthor(server.nowPlaying.title, server.nowPlaying.thumbnail)
    .setColor(0x00afff)
    .setThumbnail(server.nowPlaying.thumbnail)
    .setTimestamp();

  //Check if the rounding has overflowed
  if (timeLeft > 20) {
    timeLeft = 20;
  }

  //Defind the tracbar
  let trac = '`';

  //Iterate 21 times to place the dot and the lines
  for (let x = 0; x < 21; x++) {
    if (timeLeft == x) {
      trac += '🔘';
    } else {
      trac += '▬';
    }
  }

  //At the end add a `
  trac += '`';

  //Format the time in human form
  const moment = require('moment');

  //Set the dispatcher's current time into human form
  const d = moment.duration({
    s: server.dispatcher ? server.dispatcher.time : 0
  });
  const curTime = moment().startOf('day').add(d).format('HH:mm:ss');

  //Set the nowPlaying time into human form
  const s = moment.duration({
    s: server.nowPlaying.duration
  });
  const totTime = moment().startOf('day').add(s).format('HH:mm:ss');

  //Add the fields
  embed.addField('Title:', server.nowPlaying.title)
    .addField('Position: ', trac + `\n**[${curTime}/${totTime}]**`)
    .addField('Link: ', server.nowPlaying.url)
    .addField('Requested by: ', server.nowPlaying.requested);

  //If the song is paused, say that
  if (server.nowPlaying.playing == false) {
    embed.addField('Paused', 'The song is currently paused.');
  }

  //Send the embed
  await msg.channel.createMessage({
    embed
  });
};

exports.conf = {
  aliases: ['np'],
  guildOnly: true
};

exports.help = {
  name: 'nowplaying',
  description: 'Shows you what is currently playing',
  usage: 'nowplaying',
  permlevel: 0,
  category: 'Music'
};
