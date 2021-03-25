/* Importing dependencies into global variables */
const express = require('express'); //Server related module
const bodyParser = require('body-parser'); //Middleware bodyParser allows us to format everything in JSON format
const cors = require('cors'); //Middleware cors is required
const mysql = require('mysql'); //Module used to query MySql DB

//Setting up password hashing
const bcyrpt = require('bcrypt');
const saltRounds = 10;

//Setting up express server
const app = express();

//Creating a connection to the fdm database
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fdm'
});

//Applying the middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

//Starting up the express server at port 3001
app.listen(3001, () => {
    console.log("Server Started on Port: 3001");
});

/************************************************************ Defining the API Routes ************************************************************/
/****************************** Routes used to retrieve data ******************************/

// Route Definition: Returns all table entries in the mentor_application table
app.get('/api/get/applicants', (req,res) =>{
    const sql = "SELECT * FROM mentor_application";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns the first 5 entries in the mentor_application table
app.get('/api/get/applicants/interval=5', (req,res) =>{
    const sql = "SELECT * FROM mentor_application LIMIT 5";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all table entries in the fdm_ids table
app.get('/api/get/fdm-ids/t=fdm', (req,res) =>{
    const sql = "SELECT * FROM  fdm_ids";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all fdm ids in the mentor table
app.get('/api/get/fdm-ids/t=mentor', (req,res) =>{
    const sql = "SELECT fdm_id FROM  mentor";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all fdm ids in the mentor application table
app.get('/api/get/fdm-ids/t=application', (req,res) =>{
    const sql = "SELECT fdm_id FROM  mentor_application";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all fdm emails in the fdm email table
app.get('/api/get/fdm-emails/t=fdm', (req,res) =>{
    const sql = "SELECT fdm_email FROM  fdm_emails";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all fdm emails in the mentee table
app.get('/api/get/fdm-emails/t=mentee', (req,res) =>{
    const sql = "SELECT fdm_email FROM  mentee";
    conn.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns an entry in the mentee table where the fdm_email matches the argument that's passed
app.get('/api/get/mentee/:fdmEmail', (req,res) =>{
    let fdmEmail = req.params.fdmEmail;
    const sql = "SELECT * FROM  mentee WHERE fdm_email = ?";
    conn.query(sql, fdmEmail, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

/* Route Definition: Returns all the details (excluding account password) of an entry in the mentor table 
                     where the fdm_id matches the mentor_id (FK) of the mentor entry who's fdm_email matches the argument that's passed */
app.get('/api/get/mentor/exclude=pwd/:fdmEmail', (req,res) =>{
    let fdmEmail = req.params.fdmEmail;
    const sql = "SELECT fdm_id, firstname, lastname, description, img, email, phone FROM mentor WHERE fdm_id = (SELECT mentor_id FROM mentee WHERE fdm_email = ?)";
    conn.query(sql, fdmEmail, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns a entry (excluding the entry id & mentee id) from the areas of improvement table where the mentor id matches the one passed
app.get('/api/get/areas-of-improvements/:fdmEmail', (req,res) =>{
    const sql = "SELECT communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation FROM  areas_of_improvement WHERE mentee_email = ?";
    conn.query(sql, req.params.fdmEmail, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns a entry (excluding the mentor applicant id) from the areas of expertise table where the mentor id is not null and is equal to the input
app.get('/api/get/areas-of-expertise/:id', (req,res) =>{
    const sql = "SELECT mentor_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation FROM areas_of_expertise WHERE mentor_id = ? AND mentor_id IS NOT NULL"
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns the mentor entry (Excluding their password) from the mentor table
app.get('/api/get/mentor/:id', (req,res) =>{
    const sql = "SELECT fdm_id, firstname, lastname, description, img, email, phone FROM  mentor WHERE fdm_id = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Returns all the mentee entries (excluding password) where the mentor id matches the one passed
app.get('/api/get/mentor/mentees/:id', (req,res) =>{
    const sql = "SELECT fdm_email, firstname, lastname, description, img, email, phone, mentor_id FROM  mentee WHERE mentor_id = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});
/****************************** Routes used to delete data ******************************/

// Route Definition: Deletes an entry from the application table
app.delete('/api/delete/application/:id', (req,res) => {
    const sql = "DELETE FROM mentor_application WHERE fdm_id = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

/****************************** Routes used to update data ******************************/
// Route Definition: Updates an entry from the mentee table to set the mentor id to point to a mentor entry 
app.put('/api/update/mentee/mentor-id', (req,res) =>{
    const sql = "UPDATE mentee SET mentor_id = ? WHERE fdm_email = ?";
    conn.query(sql, [req.body.mentorId, req.body.fdmEmail], (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result)
    });
});
/****************************** Routes used to create data ******************************/

// Route Definition: Inserts a new mentor entry using an existing application entry
app.post('/api/insert/mentor/bulk-insert/:id', (req,res) => {
    const sql = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) SELECT fdm_id, pwd, firstname, lastname, description, img, email, phone FROM mentor_application WHERE fdm_id = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Inserts a new entry into the areas of expertise table using existing entry
app.post('/api/insert/areas-of-expertise/bulk-insert/:id', (req,res) => {
    const sql = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) SELECT application_id, mentor_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation FROM areas_of_expertise WHERE application_id = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Inserts a new mentor application entry using the arguments passed
app.post('/api/insert/mentor-application', async (req,res) => {
    let id = req.body.id; let hashedPwd = await bcyrpt.hash(req.body.pwd, saltRounds); //Extracting the login credentials from request
    let fname = req.body.fname; let lname = req.body.lname; //Extracting the name from request
    let desc = req.body.desc; let img = req.body.img; //Extracting the description from request
    let email = req.body.email; let phone = req.body.phone; //Extracting the contact details from request
    const sql = "INSERT INTO mentor_application (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES (?,?,?,?,?,?,?,?)";
    conn.query(sql, [id,hashedPwd,fname,lname,desc,img,email,phone], (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Inserts a new areas of expertise entry using the arguments passed
app.post('/api/insert/areas-of-expertise/fk=applicant', (req,res) => {
    let id = req.body.id; //Extracting the applicants fdm id
    let comm = req.body.comm; let confidence = req.body.confidence; let timeMng = req.body.timeMng; //Extracting the first set of soft skills
    let teamWrk = req.body.teamWrk; let ldr = req.body.ldr; let organisation = req.body.organisation; //Extracting the second set of soft skills
    let cldComp = req.body.cldComp; let sales = req.body.sales; let rec = req.body.rec; let mrkt = req.body.mrkt; let hr = req.body.hr; //Extracting the first set of hard skills
    let fin = req.body.fin; let acdmy = req.body.acdmy; let it = req.body.it; let consultant = req.body.consultant; //Extracting the second set of hard skills
    let prgm = req.body.prgm; let sftTst = req.body.sftTst; let bsnIntel = req.body.bsnIntel; let auto = req.body.auto; //Extracting the third set of hard skills
    const sql = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    conn.query(sql, [id,comm,confidence,timeMng,teamWrk,ldr,organisation,cldComp,sales,rec,mrkt,hr,fin,acdmy,it,consultant,prgm,sftTst,bsnIntel,auto], (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Inserts a new mentee entry using the arguments passed
app.post('/api/insert/mentee', async (req,res) => {
    let fdmEmail = req.body.fdmEmail; let pwd = await bcyrpt.hash(req.body.pwd, saltRounds); //Extracting the login credentials from request
    let fname = req.body.fname; let lname = req.body.lname; //Extracting the name from request
    let desc = req.body.desc; let img = req.body.img; //Extracting the description from request
    let email = req.body.email; let phone = req.body.phone; //Extracting the contact details from request
    const sql = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone) VALUES (?,?,?,?,?,?,?,?)";
    conn.query(sql, [fdmEmail,pwd,fname,lname,desc,img,email,phone], (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

// Route Definition: Inserts a new areas of improvements entry using the arguments passed
app.post('/api/insert/areas-of-improvement', (req,res) => {
    let fdmEmail = req.body.fdmEmail; //Extracting the applicants fdm id
    let comm = req.body.comm; let confidence = req.body.confidence; let timeMng = req.body.timeMng; //Extracting the first set of soft skills
    let teamWrk = req.body.teamWrk; let ldr = req.body.ldr; let organisation = req.body.organisation; //Extracting the second set of soft skills
    let cldComp = req.body.cldComp; let sales = req.body.sales; let rec = req.body.rec; let mrkt = req.body.mrkt; let hr = req.body.hr; //Extracting the first set of hard skills
    let fin = req.body.fin; let acdmy = req.body.acdmy; let it = req.body.it; let consultant = req.body.consultant; //Extracting the second set of hard skills
    let prgm = req.body.prgm; let sftTst = req.body.sftTst; let bsnIntel = req.body.bsnIntel; let auto = req.body.auto; //Extracting the third set of hard skills
    const sql = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    conn.query(sql, [fdmEmail,comm,confidence,timeMng,teamWrk,ldr,organisation,cldComp,sales,rec,mrkt,hr,fin,acdmy,it,consultant,prgm,sftTst,bsnIntel,auto], (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
});

/*-------------------------------------------------- Test Route ------------------------------------------*/
app.post('/api/test', async (req,res) => {
    let pwd = req.body.pwd;
    console.log(pwd)
    let id = req.body.id;
    console.log(id)
    let sql = "SELECT * FROM mentor_application WHERE fdm_id = ?"
    conn.query(sql, id, async (err, result) => {
        if (err) throw err;
        let matched = await bcyrpt.compare(pwd,result[0].pwd)
        res.send({matched:matched})
    });
});