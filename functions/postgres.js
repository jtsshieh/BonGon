module.exports = (bot) =>{
  bot.get = async (setting, guild_id) => {
    const pg = require('pg');
    const client = new pg.Client(process.env.DATABASE_URL);
    client.connect();

    const query = client.query(`SELECT ${setting} FROM settings WHERE guild_id = ${guild_id}`);

    query.on('row', function(row, result) {
      result.addRow(row);
    });

    query.on('end', function(result) {
      client.end();
      return JSON.stringify(result.rows, null, '    ');
    });

  };
};
