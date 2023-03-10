import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import knex from 'knex';
import knexConfig from './db/knexfile.js'


// const express = require('express');
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser');
const app = express();
const port = 6000;
// const knexConfig = require('./db/knexfile');
// const cors = require('cors');
// const { urlencoded } = require('body-parser');
const myknex  = knex(knexConfig[process.env.NODE_ENV]);
app.use(bodyParser.json());

app.use(cors({origin: '*',optionsSuccessStatus: "200"}))
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/setcookie', (req, res) =>{
    res.cookie(`Mafia cookie`, `cookie value`);
    res.send('Cookie saved');
})

app.get('/user', (req, res) => {
    console.log("Hello1");
    myknex('Users')
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
    res.setHeader('Access-Control-Allow-Origin', '*')
    const id = await myknex('Users')
    .insert({username : req.query.username, rootpass : req.query.rootpass})
    const user = await myknex('Users')
    .select({
        id: 'id',
        username: 'username'
    }).where('id', id[0])

    console.log(user[0]);

    return res.json(user[0]);
});