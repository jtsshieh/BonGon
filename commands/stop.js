exports.run = (bot, msg) => {
    let server = bot.setUpVariables(msg);
    if (!server) return msg.channel.createMessage('There is nothing to stop');
    if (!server.dispatcher) return msg.channel.createMessage('There is nothing to stop');
    server.queue = [];
    server.queueTitle = [];
    server.playing = false;
    server.dispatcher = null;
    msg.channel.createMessage('Stopped the song and cleared the queue.');
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
