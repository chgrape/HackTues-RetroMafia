import express from 'express';
import { spawn } from 'child_process';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors'
import knex from 'knex';
import knexConfig from './db/knexfile.js'
const store = new session.MemoryStore()

// const express = require('express');
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser');
const app = express();
const port = 8080;
// const knexConfig = require('./db/knexfile');
// const cors = require('cors');
// const { urlencoded } = require('body-parser');
const myknex  = knex(knexConfig[process.env.NODE_ENV]);
app.use(bodyParser.json());

app.use(session({
    secret: 'mysecret',
    resave: false,
    cookie: {maxAge: 99999},
    saveUninitialized: true,
    store
}))

app.use(cookieParser());
app.use(cors({origin: [`http://localhost:3000`, "https://retro-mafia.web.app"],optionsSuccessStatus: "200", credentials: true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function validateCookie(req, res, next){
    const {cookies} = req
    console.log(req.cookies)
    if('cookie' in cookies){
        console.log(cookies.cookie)
        if(cookies.cookie === 'burger123') next()
        else res.status(403).send({msg:"Not authenticated"})
    }else{
        res.status(401).send({msg:"No session"})
    }
}

app.get('/protected', (req, res) =>{
    res.cookie('auth', 'burger123', {secure:false, httpOnly: true});
    res.send('success')
})
 
app.get('/checkcookie', validateCookie, (req,res)=>{
    res.send({msg:"Authenticated"})
})

app.post('/login', (req, res)=>{
    console.log(req.sessionID)
    const {email, pass} = req.body;
    console.log(req.body)
    myknex('Users')
    .select({
        pass: "RootPass"
    })
    .where('email', '=',email)
    .then((users) => {
        if(email && pass){
            if(req.session.authenticated){
                res.json(req.session)
            }else{
                if(users.length === 1 && pass === users[0].pass){
                    req.session.authenticated = true
                    req.session.user = {
                        email, pass
                    }
                    res.json(req.session)
                }else{
                    res.status(403).json({msg:"Bad Creds"})
                }
            }
        }else{
            res.status(403).json({msg:"Bad Creds"})
        }
    })
    
})

app.get('/logout', (req, res) =>{
    req.session.destroy();
    res.send(200);
})

app.get('/authentication', (req, res) =>{
    res.json(req.session);
})

app.get('/user', (req, res) => {
    console.log("Hello1");
    if(req.session.authenticated == false){
        return res.status(401).json({msg:"Unauthorized"})
    }
    myknex('Passwords')
    .innerJoin('Domains', 'Domains.Id', 'Passwords.DomainId')
    .select({
        domain: 'Domains.DomainName',
        email: 'Passwords.EmailInDomain',
        pass: 'Passwords.Password'
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
    const childPython = spawn('python3', ['passwordStrength.py', JSON.stringify(req.body.pass)])
        childPython.stdout.on('data', (data) => 
        {
            console.log(`${data}`.trim());//Weak\n\n
            //console.log(`stdout: ${data}`);//Weak
            if(`${data}`.trim() === 'Weak'|| `${data}`.trim() === 'Medium' || `${data}`.trim() === 'Strong')//tez
            {
                console.log("bad password")
                return res.send('Password is too weak!');
            }
    })
    const id = await myknex('Users')
    .insert({email : req.body.email, rootpass : req.body.pass})
    
    const user = await myknex('Users')
    .select({
        id: 'id',
        email: 'email',
        rootpass: 'rootpass'
    }).where('id', id[0])


    console.log(user[0]);

    return res.json(user[0]);
});