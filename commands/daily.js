const Eris = require("eris");
const fs = require('fs');
const bank = require('../functions/bank.js');
exports.run = (bot, msg, args) => {
    fs.readFile('./users.json', function(err,content){
        var arrayOfObjects = JSON.parse(content)
            if(arrayOfObjects[msg.author.id]) {
                if(arrayOfObjects[msg.author.id]['daily'] == false){
                    arrayOfObjects[msg.author.id]['gons'] +=100
                    arrayOfObjects[msg.author.id]['daily'] = true
                    var embedToUse = bank.bank(msg, bot, 2, ["Gons Revieved","New Balance"], [`***You have recived 100 gons from the bank for your daily payout***`, `***Your new balance is ${arrayOfObjects[msg.author.id]['gons']} gons***`], [true,true])
                    msg.channel.createMessage({embed:embedToUse})
                }
                else{
                    var embedToUse = bank.bank(msg, bot, 2, ["Reject","Balance"], [`***You have already recived your daily gons, check back tomorrow (UTC-4 DST EST or UTC-5 EST) to get your next payout***`, `***Your current balance is ${arrayOfObjects[msg.author.id]['gons']} gons***`], [true,true])
                    msg.channel.createMessage({embed:embedToUse})
                    return;
                }
            }
            else{
                arrayOfObjects[msg.author.id] = {};
                arrayOfObjects[msg.author.id]['gons'] = 100;
                arrayOfObjects[msg.author.id]['daily'] = true
                var embedToUse = bank.bank(msg, bot, 3, ["Note","Gons Recieved","New Balance"], ["***Since you did not have an account, an account has been created***" ,`***You have recived 100 gons from the bank for your daily payout.***`, `***Your new balance is ${arrayOfObjects[msg.author.id]['gons']} gons***`], [true, true,true])
                msg.channel.createMessage({embed:embedToUse})
            }
            fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
            })
        })
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "daily",
    description: "Collects your daily gons if they are available.",
    usage: "j!daily",
    permlevel: 0,
    category: "Gons"
}
