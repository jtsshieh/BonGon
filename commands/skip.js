exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  if (!server) return await msg.channel.createMessage('There is nothing to skip');
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing to skip');
  if (!server.nowPlaying) return await msg.channel.createMessage('There is nothing to skip');
  const members = msg.channel.guild.channels.find(channel => channel.id == server.dispatcher.channelID).voiceMembers.size;
  if (!server.nowPlaying.votes) server.nowPlaying.votes = [];
  let found = false;
  server.nowPlaying.votes.forEach(
    function(x) {
      if (x == msg.author.id) {
        found = true;
        return;
      }
    });
  if (found == false) {
    server.nowPlaying.votes.push(msg.author.id );
    await msg.channel.createMessage('1 vote added. More than half of the people in the voice channel must vote in order to skip.');
  }
  else {
    await msg.channel.createMessage('You have already voted');
  }
  if (Math.round((members-1)/2) <= server.nowPlaying.votes.length) {
    server.dispatcher.stopPlaying();
    await msg.channel.createMessage('Enough votes have been aquired, skipped the song');
  }
};

exports.conf = {
  aliases: [],
  guildOnly: true
};

exports.help = {
  name: 'skip',
  description: 'Adds a vote to skip the song.',
  usage: 'skip',
  permlevel: 0,
  category: 'Music'
};
