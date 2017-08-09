const Eris = require("eris");
const fs = require('fs');
const reload = require("../functions/reload.js")
const commands = require("../bot.js")
exports.run = (bot, msg, args) => {
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    // the path is relative to the *current folder*, so just ./filename.js
    if(msg.author.id == "236279900728721409"){
        switch (args[0]) {
            case "command":
                reload.reloadCommand(args[1],commands.commands,msg)
            break;
        }
    }

}
