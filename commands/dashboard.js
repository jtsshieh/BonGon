exports.run = (bot, msg) => {
    msg.channel.createMessage('Here is the link to my dashboard: https://bongon.herokuapp.com/');
};
exports.conf = {
    aliases:['dash'],
    guildOnly: false
};
exports.help = {
    name: 'dashboard',
    description: 'Gives a link to the dashboard.',
    usage: 'j!dashboard',
    permlevel: 0,
    category:'Other'
};
