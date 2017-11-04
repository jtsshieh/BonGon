exports.run = async (bot, msg, args) => {
  const server = bot.MusicVariables(msg.member.guild.id);
  if (args.length) {
    const args2 = Number(args[1]);
    switch (args[0]) {
      case 'remove':
        server.queue.splice(args2 - 1, 1);
        break;
      case 'r':
        server.queue.splice(args2 - 1, 1);
        break;
      case 'repeat':
        if (!server.repeat) {
          server.repeat = true;
          msg.channel.createMessage('Repeat is now on!');
        }
        else {
          server.repeat = false;
          msg.channel.createMessage('Repeat is now off!');
        }

        return;
    }
  }
  const embed = new bot.RichEmbed();
  embed.setTitle(`${msg.member.guild.name}'s queue`);
  embed.setAuthor(bot.user.username, bot.user.avatarURL);
  embed.setColor(0x00afff);
  embed.setDescription('The queue for this server');
  embed.setTimestamp();
  let songs = '';

  for (let num; num < 10; num++) {
    const x = server.queue[num];
    const moment = require('moment');
    const s = moment.duration({s: x.duration});
    const totTime = moment().startOf('day').add(s).format('HH:mm:ss');
    songs += num + '. ' + x.title + '** - **' + totTime + '** - **' + 'Requested By: ' + x.requested + '\n';
  }

  if (songs == '') {
    songs = '*There are no songs queued!*';
  }

  embed.addField('Songs', songs);

  if (server.repeat) {
    embed.addField('Repeat', 'The queue is on repeat mode. Finished songs will go to the end of the queue.');
  }

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
  usage: 'queue (text:remove)',
  permlevel: 0,
  category: 'Music'
};
