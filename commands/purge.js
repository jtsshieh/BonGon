const Eris = require("eris");
const fs = require('fs');
exports.run = (bot, msg, args) => {
    if(![args[0]]){
        return "How many messages?"
    }
    msg.channel.purge(args[0] + 1)

}
module.exports.help = {
    description: "The command for deleting lots of messages quickly",
    usage: "j!purge <number:messages>",
    permlevel: 5,
    category:"Mod"
}
