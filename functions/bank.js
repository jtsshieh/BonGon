module.exports = (bot) =>{
    bot.bank = (msg, bot, numberOfFields, names, values, inline) => {
        var embed = {
            title: 'The Bank',
            description: '*A important message from the gon bank :bank:*',
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            color: 0x32cd32,
            fields: [

            ],
            footer: {
                text: `This message was delivered to ${msg.author.username}`
            }
        };
        for(var i = 0; i < numberOfFields; i++){
            var tempdict = {name: names[i], value: values[i], inline: inline[i]};
            embed.fields.push(tempdict);
        }
        return embed;
    };
};
