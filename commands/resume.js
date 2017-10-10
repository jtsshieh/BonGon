exports.run = (bot, msg, args, prefix) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    if (!server) return msg.channel.createMessage('There is nothing to resume');
    if (!server.dispatcher) return msg.channel.createMessage('There is nothing to resume');
    if (server.nowPlaying.playing) return msg.channel.createMessage(`You can't resume a song that is already playing. Try ${prefix}pause`);
    server.dispatcher.resume();
    server.nowPlaying.playing = true;
    bot.musicEmit.emit('resumed');
    msg.channel.createMessage('Resumed the song');
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
