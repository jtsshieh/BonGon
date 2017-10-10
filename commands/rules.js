exports.run = (bot, msg) => {
    let embed = new bot.RichEmbed();
    embed.setTitle('Rules & info for GonBon');
    embed.setDescription('Below are the rules and some info for this server');
    embed.setColor(0x00afff);
    embed.addField('Level 1 Rules', 'Do not spam the text channels\nDo not blast music in the voice channels\nOnly use one account at a time\nDon\'t use a nickname just to get to the top of the list\nKeep the conversation going');
    embed.addField('Level 2 Rules', 'Don\'t discriminate against anybody\nNEVER EVER share any malicious content\nDo not advertise anything\nDon\'t use a selfbot\n Don\'t threaten a DDOS');
    embed.addField('Level 3 Rules', 'Don\'t post any NSFW in the main chat\nDon\'t ask for an affensive nickname');
    embed.addField('If Level 1 Rules are broken,', 'First offence: warn\nSecond offence: jail\nThird offence: kick');
    embed.addField('If Level 2 Rules are broken,', 'First offence: jail\nSecond offence: kick\nThird offence: temp ban');
    embed.addField('If Level 3 Rules are broken,', 'First offence: temp ban\nSecond offence: PERM BAN');
    embed.addField('Some Info', 'BonGon\'s prefix on this server is b!. BonGon **WILL** collect all sorts of user data to enhance your experience. If you do not agree to this, your only choice is to leave the server.');
    embed.setFooter('If you have any questions regarding the rules or info, DM a staff member');
    msg.channel.createMessage({embed});
};

exports.conf = {
    aliases: [],
    guildOnly: true
};

exports.help = {
    name: 'rules',
    description: 'Lays out the rules',
    usage: 'rules',
    permlevel: 0,
    category: 'Music'
};
