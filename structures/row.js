const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

class Row {
  constructor(data) {
    this.id = data.id;

    this.guild_id = data.guild_id;

    this.joinMessage = data.joinMessage;
    this.leaveMessage = data.leaveMessage;
    this.banMessage = data.banMessage;
    this.unbanMessage = data.unbanMessage;
    this.kickMessage = data.kickMessage;

    this.joinEnabled = data.joinEnabled;
    this.leaveEnabled = data.leaveEnabled;
    this.banEnabled = data.banEnabled;
    this.unbanEnabled = data.unbanEnabled;
    this.kickEnabled = data.kickEnabled;

    this.prefix = data.prefix;

    this.memberLogChannel = data.memberLogChannel;
    this.memberLogEnabled = data.memberLogEnabled;

    this.modlogChannel = data.modlogChannel;
    this.modLogEnabled = data.modLogEnabled;

    this.Perm1Role = data.Perm1Role;
    this.Perm2Role = data.Perm2Role;
    this.Perm3Role = data.Perm3Role;
    this.Perm4Role = data.Perm4Role;
    this.Perm5Role = data.Perm5Role;
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
module.exports = Row;
