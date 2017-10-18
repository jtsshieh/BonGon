exports.run = (bot, msg) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    if (!server) return msg.channel.createMessage('There is nothing to skip');
    if (!server.dispatcher) return msg.channel.createMessage('There is nothing to skip');
    if(!server.nowPlaying) return msg.channel.createMessage('There is nothing to skip');
    let members = msg.channel.guild.channels.find(channel => channel.id == server.dispatcher.channelID).voiceMembers.size;
    server.nowPlaying.votes = 0;
    server.nowPlaying.votes +=1;
    msg.channel.createMessage('1 vote added');
    if(Math.round((members-1)/2) <= server.nowPlaying.votes){
        server.dispatcher.stopPlaying();
        msg.channel.createMessage('Enough votes have been aquired, skipped the song');
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
