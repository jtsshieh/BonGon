const Eris = require("eris");
const fs = require('fs');
const bank = require('../functions/bank.js');
exports.run = (bot, msg, args) => {
    fs.readFile('./users.json', function(err,content){
        var arrayOfObjects = JSON.parse(content)
            if(arrayOfObjects[msg.author.username]) {
                if(arrayOfObjects[msg.author.username]['daily'] == false){
                    arrayOfObjects[msg.author.username]['gons'] +=100
                    arrayOfObjects[msg.author.username]['daily'] = true
                    var embedToUse = bank.bank(msg, bot, 2, ["Gons Revieved","New Balance"], [`***You have recived 100 gons from the bank for your daily payout***`, `***Your new balance is ${arrayOfObjects[msg.author.username]['gons']} gons***`], [true,true])
                    msg.channel.createMessage({embed:embedToUse})
                }
                else{
                    var embedToUse = bank.bank(msg, bot, 2, ["Reject","Balance"], [`***You have already recived your daily gons, check back tomorrow (UTC-4 DST EST or UTC-5 EST) to get your next payout***`, `***Your current balance is ${arrayOfObjects[msg.author.username]['gons']} gons***`], [true,true])
                    msg.channel.createMessage({embed:embedToUse})
                    return;
                }
            }
            else{
                arrayOfObjects[msg.author.username] = {};
                arrayOfObjects[msg.author.username]['gons'] = 100;
                arrayOfObjects[msg.author.username]['daily'] = true
                var embedToUse = bank.bank(msg, bot, 3, ["Note","Gons Recieved","New Balance"], ["***Since you did not have an account, an account has been created***" ,`***You have recived 100 gons from the bank for your daily payout.***`, `***Your new balance is ${arrayOfObjects[msg.author.username]['gons']} gons***`], [true, true,true])
                msg.channel.createMessage({embed:embedToUse})
            }
            fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
            })
        })
}

module.exports.help = {
    description: "The command for collecting your daily gons.",
    usage: "j!dail\y",
    permlevel: 0,
    category: "Gons"
}
