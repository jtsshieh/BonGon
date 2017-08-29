const Eris = require("eris");
const fs = require('fs');
const bank = require("../functions/bank.js")
exports.run = (bot, msg, args) => {
    fs.readFile('./users.json', function(err,content){
        if (err){
            console.log(err)
            return;
        }
        var arrayOfObjects = JSON.parse(content)
            if(arrayOfObjects[msg.author.username]) {
                var embedToUse = bank.bank(msg, bot, 1, ["Available Gons"], [`***You have ${arrayOfObjects[msg.author.username]['gons']} gons***`], [true])
                msg.channel.createMessage({embed:embedToUse})
            }
            else{
                arrayOfObjects[msg.author.username] = {};
                arrayOfObjects[msg.author.username]['gons'] = 0;
                arrayOfObjects[msg.author.username]['daily'] = false;
                var embedToUse = bank.bank(msg, bot, 2, ["Note","Available Gons"], ["***Since you did not have an account, an account has been created***",`***You have ${arrayOfObjects[msg.author.username]['gons']} gons***`], [true,true])
                msg.channel.createMessage({embed:embedToUse})
                fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            }
    })
}
module.exports.help = {
    description: "The command for showing how many gons you have.",
    usage: "j!gons",
    permlevel: 0,
    category: "gons"
}
