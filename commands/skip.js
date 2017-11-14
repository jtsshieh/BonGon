exports.run = async (bot, msg) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  //Check if there is a server
  if (!server) return await msg.channel.createMessage('There is nothing to skip');
  //Check if there is a dispatcher
  if (!server.dispatcher) return await msg.channel.createMessage('There is nothing to skip');
  //Check if something is playing
  if (!server.nowPlaying) return await msg.channel.createMessage('There is nothing to skip');
  //Get the current member
  const members = msg.channel.guild.channels.find(channel => channel.id == server.dispatcher.channelID).voiceMembers.size;
  //If votes has not been initialized, initialize it
  if (!server.nowPlaying.votes) server.nowPlaying.votes = [];
  //Declare found
  let found = false;
  //See if any votes match up to this users
  server.nowPlaying.votes.forEach(
    function(x) {
      if (x == msg.author.id) {
        found = true;
        return;
      }
    });
  //If it doesn't
  if (found == false) {
    //Add that vote
    server.nowPlaying.votes.push(msg.author.id);
    await msg.channel.createMessage('1 vote added. More than half of the people in the voice channel must vote in order to skip.');
  } else {
    //Say they already voted
    await msg.channel.createMessage('You have already voted');
  }
  //Round the votes of members-the bot to the the votes
  if (Math.round((members - 1) / 2) <= server.nowPlaying.votes.length) {
    //Stop playing that song
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
