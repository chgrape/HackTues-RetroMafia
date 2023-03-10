module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:'127.0.0.1',
      port:3306,
      user:'root',
      password:'0000',
      database:'PasswordManager'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};
