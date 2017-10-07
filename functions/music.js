const YTDL = require('ytdl-core');

module.exports = (bot) =>{
    bot.playYT = (connection, msg) => {
        let server = bot.setUpVariables(msg);
        server.dispatcher = connection;
        connection.play(YTDL(server.queue[0], {
            filter: 'audioonly'
        }));
        server.playing = true;
        server.queue.shift();
        server.queueTitle.shift();
        connection.once('end', function() {
            server.skips = 0;
            if (server.queue[0]) bot.playYT(connection, msg);
            else{
                bot.leaveVoiceChannel(connection.channelID);
                server.playing = false;
            }
        });
    };
    bot.buildPlayer = (description = '', names = [], values = [], inline = [], thumbnail) => {
        let embed = new bot.RichEmbed();
        embed.setTitle('Music Player');
        embed.setAuthor(bot.user.username, bot.user.avatarURL);
        embed.setColor(0x00afff);
        embed.setDescription(description);
        embed.setThumbnail(thumbnail);
        embed.setTimestamp();
        for(let i = 0; i < names.length; i++){
            embed.addField(names[i], values[i], inline[i]);
        }
        return embed;
    };
    bot.setUpVariables = (msg) => {
        if (!bot.servers[msg.member.guild.id]) bot.servers[msg.member.guild.id] = {
            queue: [],
            queueTitle: [],
            skips: 0
        };
        return bot.servers[msg.member.guild.id];
    };
};
