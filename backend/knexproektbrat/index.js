const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6000;
const knexConfig = require('./db/knexfile');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors({origin: '*',optionsSuccessStatus: "200"}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/user', (req, res) => {
    console.log("Hello1");
    knex('Users')
    .select({
        Id: 'Id',
        Username: 'Username'
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.json({success: false, message: "There was an error with reading users"});
    })
})

app.post('/user', async (req, res) =>{
    console.log("Hello")
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.query)
    const id = await knex('Users')
    .insert({username : req.query.username, rootpass : req.query.rootpass})
    //console.log(id);
    //console.log(req.body)
    const user = await knex('Users')
    .select({
        id: 'id',
        username: 'username'
    }).where('id', id[0])

    console.log(user[0]);

    return res.json(user[0]);
    // .((Id) => {
    //     knex('Users')
    //         .select({
    //             Id: 'Id',
    //             Username: 'Username'
    //         })
    //         .where({Id})
    //         .then((user) => {
    //             return res.json(user[0]);
    //         })
    // })
    // .catch((err) => {
    //     console.error(err);
    //     return res.json({success:false, message:"Error posting in users"});
    // });


});