exports.run = (bot, msg, args) => {
    if(!args[0]){
        return 'How many messages?';
    }
    msg.channel.purge(args[0] + 1);

};
exports.conf = {
    aliases:[],
    guildOnly: true
};
exports.help = {
    name: 'purge',
    description: 'Deletes many messages quickly',
    usage: 'j!purge <number:messages>',
    permlevel: 5,
    category:'Mod'
};
