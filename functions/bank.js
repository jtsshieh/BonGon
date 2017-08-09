const Eris = require("eris");
function bank(msg, bot, numberOfFields, names, values, inline ){
    var embeds = {
        title: "The Bank", 
        description: "*A important message from the gon bank :bank:*",
        author: { 
            name: msg.author.username,
            icon_url: msg.author.avatarURL
        },
        color: 0x00afff, 
        fields: [ 

        ],
        footer: { 
            text: `This message was delivered to ${msg.author.username}`
        }
    }
    for(var i = 0; i < numberOfFields; i++){
        var tempdict = {name: names[i], value: values[i], inline: inline[i]}
        embeds.fields.push(tempdict)
    }
    return embeds
}
module.exports = {
    bank: bank
}