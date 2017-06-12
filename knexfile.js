const config = require('config');

if ( process.env.port ) {
  config['knex']['host'] = "pgdb";
} else {
  config['knex']['host'] = "localhost";
}

module.exports = config['knex'];
