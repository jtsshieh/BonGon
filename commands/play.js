exports.run = async (bot, msg, args) => {
    if (!args[0]) return await msg.channel.createMessage('A name of the song of a link is needed.');
    if (!msg.member.voiceState.channelID) return await msg.channel.createMessage('You are not in a voice channel');
    const YouTube = require('simple-youtube-api');
    const moment = require('moment');
    const youtube = new YouTube(process.env.GOOGLE);
    const url = args.join(' ').replace(/<(.+)>/g, '$1');
    if (!url) return;
    await youtube.getVideo(url)
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


    async function YTVideo(video) {
        if (video.durationSeconds === 0) {
            return msg.channel.createMessage('Live streams are not available');
        }

        const d = moment.duration({s: video.durationSeconds});
        const server = bot.MusicVariables(msg.member.guild.id);
        const time = moment().startOf('day').add(d).format('HH:mm:ss');

        server.queue.push({url: video.url, title: video.title, thumbnail: video.thumbnails.high.url, duration: video.durationSeconds, requested: msg.author.mention , playing: false});

        const embed = bot.buildPlayer('A song has been queued', ['Title:', 'Link:', 'Duration'], [video.title, video.url, time], [true, true, true], video.thumbnails.high.url, [video.title, video.thumbnails.high.url]);
        await msg.channel.createMessage( { embed } );

        if (!bot.voiceConnections.get(msg.member.guild.id)) bot.joinVoiceChannel(msg.member.voiceState.channelID).then(function(connection) {
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
