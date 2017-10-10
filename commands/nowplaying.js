exports.run = (bot, msg) => {
    let server = bot.MusicVariables(msg.member.guild.id);
    if(!server.queue)return msg.channel.createMessage('There is nothing currently playing');
    const currentTime = Math.round(server.dispatcher ? server.dispatcher.time / 60 : 0);
    const totalTime = Math.round(server.nowPlaying.duration / 60);
    const timeLeft = Math.round(currentTime/totalTime * 7);
    let embed = new bot.RichEmbed();
    embed.setTitle('Music Player');
    embed.setAuthor(server.nowPlaying.title, server.nowPlaying.thumbnail);
    embed.setColor(0x00afff);
    let trac = '';
    for(let x = 0; x < 7; x++){
        if(timeLeft == x){
            trac += ':radio_button:';
        }

        else{
            trac+= '▬';
        }
    }
    let moment = require('moment');
    let curTime = moment().startOf('day').add(server.dispatcher ? server.dispatcher.time : 0).format('HH:mm:ss');
    let totTime = moment().startOf('day').add(server.nowPlaying.duration).format('HH:mm:ss');
    embed.addField('Title', server.nowPlaying.title);
    embed.addField('Position: ', trac + `\n**[${curTime}/${totTime}]**`);
    embed.addField('Url: ', server.nowPlaying.url);
    embed.addField('Requested by: ', server.nowPlaying.requested);
    if(server.nowPlaying.playing == false){
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
