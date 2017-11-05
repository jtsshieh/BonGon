exports.run = async (bot, msg, args) => {
  const name = args[0];
  switch (args[1]) {
    case 'info':

      return;

    case 'repeat':

      return;

    case 'biginfo':

      return;
  }
};
exports.conf = {
  aliases: [],
  guildOnly: true
};
exports.help = {
  name: 'song',
  description: 'Let\'s you see info or customize a song',
  usage: 'song <text:songname> <text:info/repeat/biginfo>',
  permlevel: 0,
  category: 'Music'
};
