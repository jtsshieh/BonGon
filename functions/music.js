const YTDL = require('ytdl-core');
module.exports = (bot) => {
  bot.playYT = async (connection, msg) => {
    const EventEmitter = require('events');
    class MyEmitter extends EventEmitter {}
    bot.musicEmit = new MyEmitter();

    const server = bot.MusicVariables(msg.member.guild.id);

    server.dispatcher = connection;

    connection.play(YTDL(server.queue[0].url, {
      filter: 'audioonly'
    }));

    server.nowPlaying = server.queue[0];
    server.beforeNowPlaying = server.nowPlaying;


    server.queue.shift();

    server.nowPlaying.playing = true;

    let time = 0;
    let counter = setInterval(
      function() {
        time = time + 1;
        server.dispatcher.time = time;
      }, 1000);

    bot.musicEmit.on('paused', () => {
      clearInterval(counter);
    });

    bot.musicEmit.on('resumed',() =>{
      counter = setInterval(
        function() {
          time = time + 1;
          server.dispatcher.time = time;
        }, 1000);
    });

    connection.once('end', function() {
      clearInterval(counter);

      if (server.queue[0] || server.beforeNowPlaying) {
        if (server.repeat) {
          server.queue.push(server.beforeNowPlaying);
        }

        server.nowPlaying = null;
        bot.playYT(connection, msg);
      }

      else {
        bot.leaveVoiceChannel(connection.channelID);
        bot.servers[msg.member.guild.id] = null;
      }
    });
  };


  bot.MusicVariables = (guildID) => {
    if (!bot.servers[guildID]) {
      bot.servers[guildID] = {'queue' : [], 'dispatcher': null, 'repeat': false};
    }
    return bot.servers[guildID];
  };
};
