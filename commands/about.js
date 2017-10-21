exports.run = async (bot, msg) => {
    let embed = new bot.RichEmbed();
    embed.setTitle('About BonGon');
    embed.setDescription('A few important things');
    embed.setAuthor(msg.author.username, msg.author.avatarURL);
    embed.setColor(0x00afff);
    embed.addField('Licence', 'BonGon is licenced under the MIT licence');
    embed.addField('Privacy Policy', 'You agree that this bot will use you and your guild members information to enhance your expierience. If you do not agree to this, either kick the bot off your guild or leave the guild with the bot.');
    embed.addField('Credits', 'Creator: jtsshieh#6242 \nLibrary: Eris \nA HUGE Helper: ElJay #7711 \non the Unofficial Discord API server');
    if(msg.channel.guild){
        embed.addField('Shard Id', msg.member.guild.shard.id);
    }
    embed.setTimestamp();
    await msg.channel.createMessage( { embed } );
};
exports.conf = {
    aliases:[],
    guildOnly: false
};
exports.help = {
    name: 'about',
    description: 'Displays the about page',
    usage: 'about',
    permlevel: 0,
    category: 'Other'
};
