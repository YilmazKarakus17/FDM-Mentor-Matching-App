/* File Description: This file is used to create a mysql database */

/* Declaring necessary objects */
const express = require('express');
const app = express(); //Setting up express server
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fdm'
}); //Creating a connection 


conn.connect((err) =>{
    if(err) throw err;
    console.log("MySql Connected ...");
})


//Defining the initial route
app.get('/', (req,res) => {
    // String variable which will output the names of the tables that were created
    let tablesCreated = "Tables created: ";

    //Creating the fdm_emails table to store all the fdm recognised emails
    let sql = 'CREATE TABLE fdm_emails(fdm_email VARCHAR(255) NOT NULL PRIMARY KEY)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "fdm_emails, ";
    });

    //Creating the fdm_ids table to store all the fdm ids
    sql = 'CREATE TABLE fdm_ids(fdm_id VARCHAR(255) NOT NULL PRIMARY KEY)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "fdm_ids, ";
    });

    //Creating the mentor table
    sql = 'CREATE TABLE mentor(fdm_id VARCHAR(255) NOT NULL PRIMARY KEY, pwd VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, img VARCHAR(500) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "mentor, ";
    });

    //Creating the Mentee table
    sql = 'CREATE TABLE mentee(fdm_email VARCHAR(255) NOT NULL PRIMARY KEY, pwd VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, img VARCHAR(1000) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL, mentor_id VARCHAR(255),  FOREIGN KEY (mentor_id) REFERENCES mentor(fdm_id) ON DELETE SET NULL)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "mentee, ";
    });

    //Creating the application table
    sql = 'CREATE TABLE IF NOT EXISTS mentor_application(fdm_id VARCHAR(255) NOT NULL PRIMARY KEY, pwd VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, img VARCHAR(500) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "mentor_application, ";
    });

    //Creating the technician table
    sql = 'CREATE TABLE IF NOT EXISTS technician(fdm_id VARCHAR(255) NOT NULL PRIMARY KEY, pwd VARCHAR(255) NOT NULL)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "technician, ";
    });

    //Creating the areas_of_expertise table
    sql = 'CREATE TABLE areas_of_expertise(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, mentor_id VARCHAR(255), application_id VARCHAR(255), communication numeric(1) NOT NULL, confidence numeric(1) NOT NULL, time_management numeric(1) NOT NULL, teamwork numeric(1) NOT NULL, leadership numeric(1) NOT NULL, organisation numeric(1) NOT NULL, cloud_computing numeric(1) NOT NULL, sales numeric(1) NOT NULL, recruitment numeric(1) NOT NULL, marketing numeric(1) NOT NULL, hr numeric(1) NOT NULL, finance numeric(1) NOT NULL, academy numeric(1) NOT NULL, information_technology numeric(1) NOT NULL, consultant numeric(1) NOT NULL,programming numeric(1) NOT NULL, software_testing numeric(1) NOT NULL, business_intelligence numeric(1) NOT NULL, automation numeric(1) NOT NULL, FOREIGN KEY (mentor_id) REFERENCES mentor(fdm_id) ON DELETE CASCADE, FOREIGN KEY (application_id) REFERENCES mentor_application(fdm_id) ON DELETE CASCADE)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "areas_of_expertise, ";
    });

    //Creating the areas_of_improvement table
    sql = 'CREATE TABLE areas_of_improvement(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, mentee_email VARCHAR(255), communication numeric(1) NOT NULL, confidence numeric(1) NOT NULL, time_management numeric(1) NOT NULL, teamwork numeric(1) NOT NULL, leadership numeric(1) NOT NULL, organisation numeric(1) NOT NULL, cloud_computing numeric(1) NOT NULL, sales numeric(1) NOT NULL, recruitment numeric(1) NOT NULL, marketing numeric(1) NOT NULL, hr numeric(1) NOT NULL, finance numeric(1) NOT NULL, academy numeric(1) NOT NULL, information_technology numeric(1) NOT NULL, consultant numeric(1) NOT NULL, programming numeric(1) NOT NULL, software_testing numeric(1) NOT NULL, business_intelligence numeric(1) NOT NULL, automation numeric(1) NOT NULL, FOREIGN KEY (mentee_email) REFERENCES mentee(fdm_email) ON DELETE CASCADE)';
    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        tablesCreated += "areas_of_expertise";
        res.send(tablesCreated);
    });
});


//Starting up express server at port 3001 because the app is running on port 3000
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
