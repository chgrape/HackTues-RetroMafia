const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/user', (req, res) => {
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

    const Id = await knex('Users')
    .insert({Username : req.body.username, RootPass : req.body.RootPass})
    console.log(Id);

    const user = await knex('Users')
    .select({
        Id: 'Id',
        Username: 'Username'
    }).where('Id', Id[0])

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