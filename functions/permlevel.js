const Eris = require("eris");
module.exports = (bot) =>{
    bot.permlevel = (bot, user, msg) =>{
        if(user.id == "236279900728721409"){
            return 11;
        }
        if(user.id = msg.guild.ownerID){
          return 10;
        }
    }
}
