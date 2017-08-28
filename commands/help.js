const Eris = require("eris");
const commands = require("../bot.js")
module.exports.run = (bot, msg, args) => {
    const config = require("../config.json");

    if (!args[0]) {
        var embeds = {
            title: "Help",
            description: "The wonderful fantastic help message",
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
        /*var categories = ["mod", "Owner", "Gons"]
        for(var i = 0; i < categories.length; i++){
            var tempdict = {name: catgories[i], value: ``, inline: true}
            for(var i = 0; i < commands.commands[])
            embeds.fields.push(tempdict)
        }*/
        msg.channel.createMessage( { embed: embeds } )
    } else try{
        var embeds = {
            title: `Help for the command ${args[0]}`,
            author: {
                name: `BonGon`,
                icon_url: bot.user.avatarURL
            },
            color: 0x00afff,
            fields: [
                {
                    name: "Command",
                    value: `${args[0]}`,
                    inline:true
                },
                {
                    name: "Usage",
                    value: commands.commands[args[0]].help.usage,
                    inline:true
                },
                {
                    name:"Perm Level",
                    value: commands.commands[args[0]].help.permlevel,
                    inline:true
                },
                {
                    name: "Description",
                    value: commands.commands[args[0]].help.description,
                    inline: true
                }
            ],
            footer: {
                text: `Parameter wrapped in () are optional. Parameters wrapped in <> are required.`
            }
        }
        msg.channel.createMessage( { embed: embeds } )
    }
    catch (e){
        msg.channel.createMessage("An exception has been thrown." + e)
    }
}
module.exports.help = {
    description: "The command for listing all the commands or showing help for a command.",
    usage: "j!help (command)",
    permlevel: 0
}
