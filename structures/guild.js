const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

class guild {
  constructor(guild_id) {
    this.guild_id = guild_id;


  }
  get(setting, guild_id) {
    const query = client.query(`SELECT ${setting} FROM settings WHERE guild_id = ${guild_id}`);
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('end', function(result) {
      this[setting] = JSON.stringify(result.rows, null, '    ');
    });
    return this;
  }
  set(setting, value, guild_id) {
    client.query(`UPDATE settings SET ${setting} = ${value} WHERE guild_id = ${guild_id}`);
    const query = client.query(`SELECT ${setting} FROM settings WHERE guild_id = ${guild_id}`);
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('end', function(result) {
      this[setting] = JSON.stringify(result.rows, null, '    ');
    });
    return this;
  }
}
module.exports = guild;
