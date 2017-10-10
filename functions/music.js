let YTDL = require('ytdl-core');
module.exports = (bot) => {
    bot.playYT = (connection, msg) => {
        let server = bot.MusicVariables(msg.member.guild.id);

        server.dispatcher = connection;
        connection.play(YTDL(server.queue[0].url, {
            filter: 'audioonly'
        }));

        server.nowPlaying = server.queue[0];
        server.queue.shift();
        server.nowPlaying.playing = true;

        let time = 0;
        setInterval(
            function () {
                time = time + 1;
                server.dispatcher.time = time;
            }, 1000);

        connection.once('end', function() {
            if (server.queue[0]){
                server.nowPlaying = null;
                bot.playYT(connection, msg);
            }
            else {
                bot.leaveVoiceChannel(connection.channelID);
                server = {};
            }
        });
    };
    bot.buildPlayer = (description = '', names = [], values = [], inline = [], thumbnail, author = [bot.user.username, bot.user.avatarURL]) => {
        let embed = new bot.RichEmbed();
        embed.setTitle('Music Player');
        embed.setAuthor(author[0], author[1]);
        embed.setColor(0x00afff);
        embed.setDescription(description);
        embed.setThumbnail(thumbnail);
        embed.setTimestamp();
        for (let i = 0; i < names.length; i++) {
            embed.addField(names[i], values[i], inline[i]);
        }
        return embed;
    };
    bot.MusicVarShift = (guildID) => {
        bot.MusicVariables(guildID);
        bot.servers[guildID].foreach(function(x){
            x.shift();
        });
        return bot.MusicVariables(guildID);
    };
    bot.MusicVariables = (guildID) => {
        if (!bot.servers[guildID]) {
            bot.servers[guildID] = {'queue' : [], 'dispatcher': null};
        }
        return bot.servers[guildID];
    };
};
