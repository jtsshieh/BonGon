const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('CREATE TABLE settings (id SERIAL PRIMARY KEY NOT NULL, guild_id VARCHAR (20) NOT NULL, joinMessage VARCHAR (100) NOT NULL, leaveMessage VARCHAR (100) NOT NULL, banMessage VARCHAR (100) NOT NULL, unbanMessage VARCHAR (100) NOT NULL, kickMessage VARCHAR (100) NOT NULL, joinEnabled BOOL NOT NULL, leaveEnabled BOOL NOT NULL, banEnabled BOOL NOT NULL,unbanEnabled BOOL NOT NULL,kickEnabled BOOL NOT NULL,prefix VARCHAR (5) NOT NULL,memberLogChannel VARCHAR (50) NOT NULL,memberLogEnabled BOOL NOT NULL,modlogChannel VARCHAR (50) NOT NULL,modLogEnabled BOOL NOT NULL, Perm1Role VARCHAR (50) NOT NULL,Perm2Role VARCHAR (50) NOT NULL,Perm3Role VARCHAR (50) NOT NULL,Perm4Role VARCHAR (50) NOT NULL,Perm5Role VARCHAR (50) NOT NULL	);');
