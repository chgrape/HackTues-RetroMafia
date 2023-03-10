const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '0000',
  database: 'PasswordManager',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
}).promise()

// async function getUsers()
// {
//     const[rows] = await pool.query("SELECT * FROM Users")
//     return rows
// }

async function getUsers(){
    
    const [users] = await pool.query(`Select * from Users`)
    return users
}

async function getUser(id)
{
    const [user] = await pool.query
    (
        `select * from Users
        Where id = ?`, [id])
    return user[0] 
}

async function addUser(Id, Username, RootPass)
{
    const user = (async () => 
    {
        try
        {
            const [result] = await pool.query(`insert into Users (Id, Username, RootPass)
             VALUES (?, ?, ?)`,
             [Id, Username, RootPass])
            const id = result.insertId
            return getUser(id)
        }
        catch(err){
            console.log(err);
        }
    })();    
}

module.export = {getUser, addUser, getUsers} 
//addUser(3, "pedal", "mda")
getUsers().then((res) => console.log(res))
//console.log()