const Eris = require("eris");
const fs = require('fs');
const schedule = require('node-schedule')
const config = require('./config.json')

schedule.scheduleJob({hour: 00, minute: 00}, () => {
    fs.readFile('users.json', function(err,content){
    var arrayOfObjects = JSON.parse(content)
        for (var key in arrayOfObjects) {
            arrayOfObjects[key]['daily'] = false
        }
    fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
        })
    })
})



var bot = new Eris(config.token);
var commands = {};
var functions = {};
var events = {};

module.exports = {
    commands:commands,
    function: functions
}
bot.on("ready", () => {
    try{
        fs.readdir( `./commands/`, function( err, files ) {
            if( err ) return console.error( "Could not list the directory.", err );
            files.forEach( function( file, index ) {
                commands[file.substr(0, file.lastIndexOf("."))] = require(`./commands/${file}`);
                console.log(`Loaded command ${file.substr(0, file.lastIndexOf("."))}`)
            } );
        } );
        fs.readdir( `./functions/`, function( err, files ) {
            if( err ) return console.error( "Could not list the directory.", err );
            files.forEach( function( file, index ) {
                functions[file.substr(0, file.lastIndexOf("."))] = require(`./functions/${file}`);
                console.log(`Loaded function ${file.substr(0, file.lastIndexOf("."))}`)
            } );
        } );

        console.log("Ready!");
    } catch (err) {
        console.error(err);
    }
});

bot.on("messageCreate", (msg) =>{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const commandFile = Object.keys(commands).find(c => c === command);
    if(commandFile != undefined && msg.content.startsWith(config.prefix)){
        commands[commandFile].run(bot, msg, args)
    }
});

bot.connect();
