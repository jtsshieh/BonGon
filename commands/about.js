const Eris = require("eris");
exports.run = (bot, msg, args) => {
    var embeds = {
        title: "About BonGon",
        description: "A few important things",
        author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
        },
        color: 0x00afff,
        fields: [
            {
                name: "Licence",
                value: "BonGon is licenced under the MIT licence",
                inline : true
            },
            {
                name: "Privacy Policy",
                value: "You agree that this bot will use you and your guild members information to enhance your expierience. If you do not agree to this, either kick the bot off your guild or leave the guild with the bot.",
                inline: true
            },
            {
                name: "Credits",
                value: "Creator: jtsshieh#6242 \nLibrary: Eris \nA HUGE Helper: EiJay #7711 \non the Unofficial Discord API server"
            }
        ],
        footer: {
            text: `This message was delivered to ${msg.author.username}`
        }
    }
    msg.channel.createMessage( { embed : embeds } )
}
module.exports.help = {
    description: "Displays the about page",
    usage: "j!about",
    permlevel: 0,
    category: "Other"
}
