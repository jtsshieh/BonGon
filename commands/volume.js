exports.run = (bot, msg, args, prefix) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    if (!args[0]) {
        let embed = bot.buildPlayer(`The current volume for this queue is ${server.dispatcher.volume * 100}%. Use ${prefix}volume to change it`, [], [], [], server.nowPlaying.thumbnail, [server.nowPlaying.title, server.nowPlaying.thumbnail]);
        return msg.channel.createMessage({embed});
    }

    if (args[0] < 0 || args[0] > 100) {
        return msg.channel.createMessage('Invalid Volume! Please provide a volume from 0 to 100.');
    }

    let volume = Number(args[0]) / 100;
    if (server.dispatcher) {
        server.dispatcher.setVolume(volume);
        msg.channel.createMessage(`Volume set: ${volume * 100}%`);
    }
};

exports.conf = {
    aliases: ['vol'],
    guildOnly: true
};

exports.help = {
    name: 'volume',
    description: 'Allows you to change or view the volume',
    usage: 'volume (number 0-100:Volume level)',
    permlevel: 0,
    category: 'Music'
};
