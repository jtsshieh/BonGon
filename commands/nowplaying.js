exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  if (!server.nowPlaying) return await msg.channel.createMessage('There is nothing currently playing');
  const currentTime = Math.round(server.dispatcher ? server.dispatcher.time / 60 : 0);
  const totalTime = Math.round(server.nowPlaying.duration / 60);
  let timeLeft = Math.round(currentTime/totalTime * 40);

  const embed = new bot.RichEmbed();
  embed.setTitle('Music Player');
  embed.setAuthor(server.nowPlaying.title, server.nowPlaying.thumbnail);
  embed.setColor(0x00afff);

  if (timeLeft > 10) {
    timeLeft = 10;
  }
  let trac = '';
  for (let x = 0; x <  41; x++) {
    if (timeLeft == x) { trac += ':radio_button:'; }
    else { trac+= '▬';}
  }
  const moment = require('moment');
  const d = moment.duration({s: server.dispatcher ? server.dispatcher.time : 0});
  const curTime = moment().startOf('day').add(d).format('HH:mm:ss');
  const s = moment.duration({s: server.nowPlaying.duration});
  const totTime = moment().startOf('day').add(s).format('HH:mm:ss');
  embed.addField('Title:', server.nowPlaying.title);
  embed.addField('Position: ', trac + `\n**[${curTime}/${totTime}]**`);
  embed.addField('Link: ', server.nowPlaying.url);
  embed.addField('Requested by: ', server.nowPlaying.requested);
  if (server.nowPlaying.playing == false) {
    embed.addField('Paused', 'The song is currently paused.');
  }
  embed.setThumbnail(server.nowPlaying.thumbnail);
  embed.setTimestamp();
  await msg.channel.createMessage({embed});
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
