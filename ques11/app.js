const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs=require("fs")
const app = express();
const path=require('path');
const port = 3000; // You can use any port you prefer

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
            user:'root',
            password:'',
            database:'mydb'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');

})
app.get('/showsignin',(req,res)=>{
    res.sendFile(__dirname+'/signIn.html');
    

})
app.get('/showsignup',(req,res)=>{
    res.sendFile(__dirname+'/signUp.html');


})

app.post('/dosignin', (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    
    console.log(req.body);

    const sql = `SELECT * FROM userlogin WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Welcome, ' + username);
        } else {
            res.send('Invalid credentials');
        }
    });
});

app.post('/dosignup', (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    const sql = `INSERT INTO userlogin (username, password,email) VALUES (?, ?,?)`;
    db.query(sql, [username, password,email], (err) => {
        if (err) throw err;
        res.write('Sign up successful');
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});