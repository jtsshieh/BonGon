exports.run = async (bot, msg, args) => {
  let user;

  //Check if there are mention
  if (msg.mentions.length) {
    user = msg.mentions[0];
  }
  //Parse the amount of msgs as an int
  const amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
  //Check if amount is null
  if (!amount) return msg.channel.createMessage('You must specify an amount of messages to delete.');
  //Check is amount is null and user is null
  if (!amount && !user) return msg.channel.createMessage('You must specify an amount of messages to delete and a mention.');
  //Delete the user's command
  msg.delete();

  //Say purging message
  await msg.channel.createMessage('Purging messages...').then(msg => {
    setTimeout(function() {
      //Check if there is a user specified
      if (!user) {
        //Purge that amount
        msg.channel.purge(amount).then(no =>
          //Say in the channel it purge that amount and delete after 5 seconds
          msg.channel.createMessage(`Purged ${+no} messages`).then(m => {
            setTimeout(function() {
              m.delete();
            }, 5000);
          })
        );

      } else {
        //Set the filter of the user
        const filterBy = user ? user.id : this.bot.user.id;
        //Purge the amount
        msg.channel.purge(amount + 2, m => m.author.id === filterBy).then(no =>
          //Say in the channel that it purged and delete after 5 seconds
          msg.channel.createMessage(`Purged ${+no} messages from ${user.username}`).then(m => {
            setTimeout(function() {
              m.delete();
            }, 5000);
          })
        );
      }
      //Delete the purging messages text after half a second
      msg.delete();
    }, 500);
  });
};
exports.conf = {
  aliases: ['delete', 'rm', 'remove'],
  guildOnly: true
};
exports.help = {
  name: 'purge',
  description: 'Deletes many msgs quickly',
  usage: 'purge (user:mention) <number:msgs>',
  permlevel: 5,
  category: 'Mod'
};
