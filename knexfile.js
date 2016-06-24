require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/talkart'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
