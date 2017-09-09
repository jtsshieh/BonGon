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
            if(arrayOfObjects[msg.author.id]) {
                var embedToUse = bank.bank(msg, bot, 1, ["Available Gons"], [`***You have ${arrayOfObjects[msg.author.id]['gons']} gons***`], [true])
                msg.channel.createMessage({embed:embedToUse})
            }
            else{
                arrayOfObjects[msg.author.id] = {};
                arrayOfObjects[msg.author.id]['gons'] = 0;
                arrayOfObjects[msg.author.id]['daily'] = false;
                var embedToUse = bank.bank(msg, bot, 2, ["Note","Available Gons"], ["***Since you did not have an account, an account has been created***",`***You have ${arrayOfObjects[msg.author.id]['gons']} gons***`], [true,true])
                msg.channel.createMessage({embed:embedToUse})
                fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            }
    })
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "gons",
    description: "Displays how many gons you currently have.",
    usage: "j!gons",
    permlevel: 0,
    category: "Gons"
}
