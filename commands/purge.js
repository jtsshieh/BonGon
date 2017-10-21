exports.run =async (bot, msg, args) => {
    let user;
    if(msg.mentions.length){
        user = msg.mentions[0];
    }
    let amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
    if (!amount) return msg.channel.createMessage('You must specify an amount of messages to delete.');
    if (!amount && !user) return msg.channel.createMessage('You must specify an amount of messages to delete and a mention.');
    msg.delete();
    await msg.channel.createMessage('Purging messages...').then(msg => {
        setTimeout(function() {
            if(!user){
                await msg.channel.purge(amount).then(no =>
                    await msg.channel.createMessage( `Purged ${+no} messages`).then(m => {
                        setTimeout(function() {
                            m.delete();
                        }, 5000);
                    })
                );
            }
            else{
                let filterBy = user ? user.id : this.bot.user.id;
                await msg.channel.purge(amount + 2, m => m.author.id === filterBy).then(no =>
                    await msg.channel.createMessage( `Purged ${+no} messages from ${user.username}`).then(m => {
                        setTimeout(function() {
                            m.delete();
                        }, 5000);
                    })
                );
            }
            msg.delete();
        }, 500);
    });
};
exports.conf = {
    aliases:['delete', 'rm', 'remove'],
    guildOnly: true
};
exports.help = {
    name: 'purge',
    description: 'Deletes many msgs quickly',
    usage: 'purge (user:mention) <number:msgs>',
    permlevel: 5,
    category:'Mod'
};
