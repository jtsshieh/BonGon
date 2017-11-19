exports.run = async (bot, msg, args) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  //Check if there was an option
  if (args.length) {
    //Take the second arg
    const args2 = Number(args[1]);
    //Switch through the args
    switch (args[0]) {
      //See if it is remove
      case 'remove' || 'delete':
        //Splice that item
        server.queue.splice(args2 - 1, 1);
        break;
      case 'repeat' || 'r':
        if (!server.repeat) {
          server.repeat = true;
          msg.channel.createMessage('Repeat is now on!');
        } else {
          server.repeat = false;
          msg.channel.createMessage('Repeat is now off!');
        }
        return;
    }
  }

  //Setup the queue
  const embed = new bot.RichEmbed()
    .setTitle(`${msg.member.guild.name}'s queue | Beat Music Player`)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(0x00afff)
    .setDescription('The queue for this server')
    .setTimestamp();

  //Define vars
  let number = 0;
  let extra = 0;
  let songs = '';

  //Iterate through the queue
  server.queue.forEach(function(x) {
    //Check if there are more than 10 entries
    if (number >= 10) {
      return extra++;
    }
    //Format the times in human form
    const moment = require('moment');
    const s = moment.duration({
      s: x.duration
    });
    const totTime = moment().startOf('day').add(s).format('HH:mm:ss');

    //Add 1 to the number
    number++;

    //Add one queue item
    songs += number + '. ' + x.title + '** - **' + totTime + '** - **' + 'Requested By: ' + x.requested + '\n';
  });

  //If there are extra, put a note at the bottom
  if (extra > 0) {
    songs += '---------------' + extra + ' more---------------';
  }
  //If there are no songs queued
  if (songs == '') {
    songs = '*There are no songs queued!*';
  }
  //Add the Songs Field
  embed.addField('Songs', songs);
  //If repeat is on, put that note
  if (server.repeat) {
    embed.addField('Repeat', 'The queue is on repeat mode. Finished songs will go to the end of the queue.');
  }
  //Create the message with the RichEmbed
  return await msg.channel.createMessage({
    embed
  });
};
exports.conf = {
  aliases: ['q'],
  guildOnly: true
};
exports.help = {
  name: 'queue',
  description: 'View this server\'s queue, or modify it.',
  usage: 'queue (text:remove/r/repeat)',
  permlevel: 0,
  category: 'Music'
};
