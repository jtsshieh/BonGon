exports.run = async (bot, msg, args) => {
  //Check if user is in vc or no song/link
  if (!args[0]) return await msg.channel.createMessage('A name of the song of a link is needed.');
  if (!msg.member.voiceState.channelID) return await msg.channel.createMessage('You are not in a voice channel');

  const YouTube = require('simple-youtube-api');
  const moment = require('moment');

  //Initialize a new youtube instance with the google token
  const youtube = new YouTube(process.env.GOOGLE);

  //Get the url
  const url = args.join(' ').replace(/<(.+)>/g, '$1');
  //Check if it exists
  if (!url) return;
  //Try to get the video
  await youtube.getVideo(url)
    //If possible
    .then(results => {
      //Pass the video object into info function
      YTVideo(results);
    })
    //If no url
    .catch(() => {
      //Search for the video
      youtube.searchVideos(args.join(' '), 1)
        .then(results => {
          //Get the first result
          youtube.getVideo(results[0].url)
            .then(vid => {
              //Pass in the video object for processing
              YTVideo(vid);
            });
        });
    });


  //Video Processing
  async function YTVideo(video) {
    //If it is a live stream
    if (video.durationSeconds === 0) {
      return msg.channel.createMessage('Live streams are not available');
    }

    //Get the video's duration in human form
    const d = moment.duration({
      s: video.durationSeconds
    });

    const server = bot.MusicVariables(msg.member.guild.id);
    //Format the duration
    const time = moment().startOf('day').add(d).format('HH:mm:ss');

    //Push all the required info into the queue
    server.queue.push({
      url: video.url,
      title: video.title,
      thumbnail: video.thumbnails.high.url,
      duration: video.durationSeconds,
      requested: msg.author.mention,
      playing: false
    });

    //Build the player
    const embed = new bot.RichEmbed()
      .setTitle('A song has been queued | Beat Music Player')
      .setAuthor(server.nowPlaying.title, server.nowPlaying.thumbnail)
      .setColor(0x00afff)
      .setTimestamp()
      .addField('Title', video.title)
      .addField('Link', video.url)
      .addField('Duration', time)
      .setThumbnail(video.thumbnails.high.url)
      .setFootor(video.title, video.thumbnails.high.url);

    //Send the player
    await msg.channel.createMessage({
      embed
    });

    //See if the bot is in the vc already
    if (!bot.voiceConnections.get(msg.member.guild.id))
      //Join VC
      bot.joinVoiceChannel(msg.member.voiceState.channelID).then(function(connection) {
        //Pass the song into the music handler
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
