const Eris = require("eris");
function errorMessage(bot, Message) {
    var embed = {
        title: "Error",
        description: "An Error has occured.",
        author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL
        },
        color: 0xff0000,
        fields: [
            {
                name: "Error",
                value: Message
            }
        ],
        footer: {
            text: ` This error has automatically been reported to jtsshieh#6424`
        }
    }
    bot.getDMChannel("236279900728721409").then(channel => {
        channel.createMessage({embed});
    });
    return embed
}

module.exports = {
    errorMessage: errorMessage
}
