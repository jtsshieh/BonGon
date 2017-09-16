exports.run = async (bot, msg, args) => {
    if(msg.author.id == "236279900728721409"){
        await msg.channel.createMessage(`Bot is now shutting down...`);
        process.exit(1);
    }
};

exports.conf = {
    aliases: [],
};

exports.help = {
    name: "shutdown",
    description: "Shutdowns the bot.",
    usage: "j!shutdown",
    permlevel: 11,
    category: "Owner"
};
