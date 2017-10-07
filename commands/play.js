exports.run = (bot, msg, args) => {
    const YTDL = require('ytdl-core');
    const search = require('youtube-search');
    if (!args[0]) return msg.channel.createMessage('A name of the song of a link is needed.');
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage('You are not in a voice channel');
    let server = bot.setUpVariables(msg);
    if (args[0].startsWith('http')) {
        YTDL.getInfo(args.join(' '), function(err, info) {
            let embed = bot.buildPlayer('A song has been queued', ['Title:', 'Link:'], [info.title, info.link], [true, true], info.thumbnails.default.url);
            msg.channel.createMessage( { embed } );
            server.queueTitle.push(info.title);
        });
        server.queue.push(args[0]);
    } else {
        let server = bot.servers[msg.member.guild.id];
        let opts = {
            key: 'AIzaSyDR7_oydL6a1imKIPD95-H8gQ4tvYz0I_c',
        };
        let name = args.join(' ');
        search(name, opts, (err, results) => {
            if (err) return console.log(err);
            server.queue.push(results[0].link);
            let embed = bot.buildPlayer('A song has been queued', ['Title:', 'Link:'], [results[0].title, results[0].link], [true, true], results[0].thumbnails.default.url);
            msg.channel.createMessage( { embed } );
            server.queueTitle.push(results[0].title);
        });
    }
    if(!bot.voiceConnections.get(msg.member.guild.id)) bot.joinVoiceChannel(msg.member.voiceState.channelID).then(function(connection) { //joins the vc
        bot.playYT(connection, msg);
    });
};
exports.conf = {
    aliases: ['p'],
    guildOnly: true
};
exports.help = {
    name: 'play',
    description: 'Search for a song or provide a link and the bot will play it.',
    usage: 'play <text:ytlink/ytsearch>',
    permlevel: 0,
    category: 'Music'
};
