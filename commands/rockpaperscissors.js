exports.run = async (bot, msg) => {
  let counter = 0;
  //const answer = bot.awaitMessage(['rock', 'paper', 'scissors']);
  setInterval(time, 1000);
  function time() {
    counter++;
    if (counter == 30) {
      return msg.channel.createMessage('You took to long, Computer Wins!');
    }
  }
};

exports.conf = {
  aliases: ['rps'],
  guildOnly: false
};

exports.help = {
  name: 'rockpaperscissors',
  description: 'Play Rock, Paper, Scissors with an ROBOT!!',
  usage: 'rockpaperscissors',
  permlevel: 0,
  category: 'Fun'
};
