exports.run = async (bot, msg) => {
  //Check if owner
  if (msg.author.id == '236279900728721409') {
    //Say it is shutting down
    await msg.channel.createMessage('Bot is now shutting down...');
    //Exit the process
    process.exit(0);
  }
};

exports.conf = {
  aliases: ['shut', 'reboot'],
  guildOnly: false
};

exports.help = {
  name: 'shutdown',
  description: 'Shutdowns the bot.',
  usage: 'shutdown',
  permlevel: 11,
  category: 'Owner'
};
