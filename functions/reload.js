const Eris = require("eris");
function reloadCommand(command, commands, msg){
     try {
      delete require.cache[require.resolve(`../commands/${command}.js`)];
      commands[command] = require(`../commands/${command}.js`);
      console.log(`Reloaded command ${command}`)
      msg.channel.createMessage(`The command ${command} has been reloaded`);
    } catch (e) {
      msg.channel.createMessage(`There either wasen't a command named ${command} or an error has occured. If there is an error report it to the dev and here is it ${e}`)
    }
}
function reloadFunction(funcname, functions, msg){
     try {
      console.log(functions[funcname])
      console.log(functions[funcname].bank)
      delete require.cache[require.resolve(`../functions/${funcname}.js`)];
      functions[funcname] = require(`../functions/${funcname}.js`);
      console.log(functions[funcname])
      console.log(functions[funcname].bank)
      console.log(`Reloaded function ${funcname}`)
      msg.channel.createMessage(`The function ${funcname} has been reloaded`);
    } catch (e) {
      msg.channel.createMessage(`There either wasen't a function named ${funcname} or an error has occured. If there is an error report it to the dev and here is it ${e}`)
    }
}
module.exports = {
    reloadCommand: reloadCommand,
    reloadFunction:reloadFunction
}
