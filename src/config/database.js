const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dialect: 'mysql',
  host: process.env.MYSQL_CONN_HOST,
  username: process.env.MYSQL_CONN_USER,
  password: process.env.MYSQL_CONN_PASSWORD,
  database: process.env.MYSQL_CONN_DB,
  define: {
    timestamps: true,
    underscored: false,
  },
};
