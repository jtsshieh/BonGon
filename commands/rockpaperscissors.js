exports.run = async (bot, msg) => {
  let counter = 0;
  const answer = bot.awaitMessage(['rock', 'paper', 'scissors']);
  console.log(answer)
  setInterval(function() {
    if (answer) {
      return msg.channel.createMessage('I work!');
    }
    counter +=1;
    if (counter == 30) {
      return msg.channel.createMessage('Times up, you weren\'t fast enough. The computer automatically wins!');
    }
  }, 1000);
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
