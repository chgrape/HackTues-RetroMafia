export default {

  development: {
    client: 'mysql',
    connection: {
      host:'127.0.0.1',
      port:3306,
      user:'root',
      password:'1234',
      database:'PasswordManager'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};
