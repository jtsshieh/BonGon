exports.run = (bot, msg) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    const currentTime = Math.round(server.dispatcher ? server.dispatcher.time / 60 : 0 * 10);
    const totalTime = Math.round(server.nowPlaying.duration / 60 * 10);
    const timeLeft = Math.round(currentTime/totalTime * 5);
    let embed = new bot.RichEmbed();
    embed.setTitle('Music Player');
    embed.setAuthor(server.nowPlaying.title, server.nowPlaying.thumbnail);
    embed.setColor(0x00afff);
    let desc = '';
    for(let x = 0; x < 5; x++){
        if(timeLeft == x){
            desc += ':radio_button:';
        }

        else{
            desc+= '▬';
        }
    }
    embed.setDescription(desc);
    if(server.playing == false){
        embed.addField('Paused', 'The song is currently paused.');
    }
    embed.setThumbnail(server.nowPlaying.thumbnail);
    embed.setTimestamp();
    msg.channel.createMessage({embed});
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
