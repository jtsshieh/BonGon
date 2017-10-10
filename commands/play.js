exports.run = (bot, msg, args) => {
    if (!args[0]) return msg.channel.createMessage('A name of the song of a link is needed.');
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage('You are not in a voice channel');
    let YouTube = require('simple-youtube-api');
    let moment = require('moment');
    let youtube = new YouTube('AIzaSyDk97VQaFR-nCVZ0JWZbWYM5u7g-9B4ly4');
    let url = args.join(' ').replace(/<(.+)>/g, '$1');
    youtube.getVideo(url)
        .then(results => {
            YTVideo(results);
        })
        .catch(() =>{
            youtube.searchVideos(args.join(' '), 1)
                .then(results => {
                    youtube.getVideo(results[0].url)
                        .then(vid => {
                            YTVideo(vid);
                        });
                });
        });


    function YTVideo(video) {
        if (video.durationSeconds === 0) {
            return msg.channel.createMessage('Live streams are not available');
        }

        let d = moment.duration({s: video.durationSeconds});
        let server = bot.MusicVariables(msg.member.guild.id);
        let time = moment().startOf('day').add(d).format('HH:mm:ss');

        server.queue.push({url: video.url, title: video.title, thumbnail: video.thumbnails.high.url, duration: video.durationSeconds, requested: msg.author.username + msg.author.discriminator, playing: false});

        let embed = bot.buildPlayer('A song has been queued', ['Title:', 'Link:', 'Duration'], [video.title, video.url, time], [true, true, true], video.thumbnails.high.url, [video.title, video.thumbnails.high.url]);
        msg.channel.createMessage( { embed } );

        if(!bot.voiceConnections.get(msg.member.guild.id)) bot.joinVoiceChannel(msg.member.voiceState.channelID).then(function(connection) {
            bot.playYT(connection, msg);
        });
        return null;
    }

};
exports.conf = {
    aliases: ['p'],
    guildOnly: true
};
exports.help = {
    name: 'play',
    description: 'Search for a song or provide a link and the bot will play it.',
    usage: 'play <text:ytlink/text:ytsearch>',
    permlevel: 0,
    category: 'Music'
};
