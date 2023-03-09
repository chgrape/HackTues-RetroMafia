module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:'localhost',
      port:3306,
      user:'root',
      password:'SOFih39SOFIb032bSp@',
      database:'PasswordManager'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};