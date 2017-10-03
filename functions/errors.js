module.exports = (bot) =>{
    bot.errorMessage = (bot, error) => {
        let embed = new bot.RichEmbed();
        embed.setTitle('Error');
        embed.setDescription('An Error has occured');
        embed.setAuthor(bot.user.username, bot.user.avatarURL);
        embed.setColor(0xff0000);
        embed.addField('Error', error);
        embed.setFooter('This error has automatically been reported to jtsshieh#6424');
        embed.setTimestamp();
        bot.getDMChannel('236279900728721409').then(channel => {
            channel.createMessage({embed});
        });
        return embed;
    };
};
