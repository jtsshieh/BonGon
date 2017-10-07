exports.run = (bot, msg, args, prefix) => {
    let server = bot.setUpVariables(msg);
    if (!server) return msg.channel.createMessage('There is nothing to pause');
    if (!server.dispatcher) return msg.channel.createMessage('There is nothing playing');
    if (!server.playing) return msg.channel.createMessage(`The song is already paused. Try typing ${prefix}resume`);
    server.dispatcher.pause();
    server.playing = false;
    msg.channel.createMessage('Paused the song');
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
