/* File Description: This file is used to create a mysql database */

/* Declaring necessary objects */
const express = require('express');
const app = express(); //Setting up express server
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
}); //Creating a connection 


conn.connect((err) =>{
    if(err) throw err;
    console.log("MySql Connected ...");
})


//Defining the initial route
app.get('/', (req,res) => {
    let sql = 'CREATE DATABASE fdm';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        console.log(result);
        res.send('Database Created');
    });
});



//Starting up express server at port 3001 because the app is running on port 3000
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
