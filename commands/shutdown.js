exports.run = (bot, msg) => {
    if(msg.author.id == '236279900728721409'){
        msg.channel.createMessage('Bot is now shutting down...');
        process.exit(0);
    }
};

exports.conf = {
    aliases: [],
    guildOnly: false
};

exports.help = {
    name: 'shutdown',
    description: 'Shutdowns the bot.',
    usage: 'j!shutdown',
    permlevel: 11,
    category: 'Owner'
};
