const Eris = require("eris");
function permlevel(user,msg){
    if(user.id == "236279900728721409"){
        return 11;
    }
    if(user.id = msg.guild.ownerID){
      return 10;
    }
}
module.exports = {
    permlevel: permlevel
}
