require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "leaf_db",
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT,
  },
  test: {
    username: "root",
    password: null,
    database: "leaf_db",
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
