module.exports = (bot) =>{
    bot.bank = (msg, bot, numberOfFields, names, values, inline) => {
        let embed = new bot.RichEmbed();
        embed.setTitle('The Bank');
        embed.setDescription('*A important message from the gon bank :bank:*');
        embed.setAuthor(msg.author.username, msg.author.avatarURL);
        embed.setColor(0x32cd32);
        embed.setTimestamp();
        for(let i = 0; i < numberOfFields; i++){
            embed.addField(names[i], values[i], inline[i]);
        }
        return embed;
    };
};
