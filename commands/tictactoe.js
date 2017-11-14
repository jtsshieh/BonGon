exports.run = async (bot, msg) => {
  let counter = 0;
  const answer = bot.awaitMessage(['rock', 'paper', 'scissors']);
  const timer = setInterval(function() {
    if (answer) {
      clearInterval(timer);
      return msg.channel.createMessage('I work!');
    }
    counter += 1;
    if (counter == 30) {
      return msg.channel.createMessage('Times up, you weren\'t fast enough. The computer automatically wins!');
    }
  }, 1000);
};

exports.conf = {
  aliases: ['ttt'],
  guildOnly: false
};

exports.help = {
  name: 'tictactoe',
  description: 'Play Tic Tac Toe with someone!',
  usage: 'tictactoe <user:mention>',
  permlevel: 0,
  category: 'Fun'
};
