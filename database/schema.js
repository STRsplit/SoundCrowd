module.exports = {
	session: 
    'CREATE TABLE IF NOT EXISTS sessions (\
			session_id 		int(11) not null auto_increment primary key,\
			user_id 			varchar(100) not null default \'a\',\
			playlist_id   varchar(100) not null default \'a\'\
	  )',
  users: 
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50) NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL
    )`
};