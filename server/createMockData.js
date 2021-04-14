/* Declaring necessary objects */
const express = require('express');
const app = express(); //Setting up express server
const mysql = require('mysql');

//setting up password hashing
const bcyrpt = require('bcrypt');
const saltRounds = 10;

//Creating a DB connection 
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fdm'
});


conn.connect((err) =>{
    if(err) throw err;
    console.log("MySql Connected ...");
})

//Defining the route that creates the list of existing fdm ids
app.get('/fdmIds', (req,res) => {
    let i;
    for (i=1;i<=20;i++){
        let id = "fdm"+i.toString();
        let sqlInsert = "INSERT INTO fdm_ids (fdm_id) VALUES (?)";
        conn.query(sqlInsert, id, (err, result) =>{
            if (err) throw err;
        });    
    }
    res.send("FDM ids created")
});

//Defining the route that creates the list of existing fdm emails
app.get('/fdmEmails', (req,res) => {
    let i;
    for (i=1;i<=9;i++){
        let id = "fdm000"+i.toString()+"@fdm.co.uk";
        let sqlInsert = "INSERT INTO fdm_emails (fdm_email) VALUES (?)";
        conn.query(sqlInsert, id, (err, result) =>{
            if (err) throw err;
        });    
    }
    for (i=1;i<=9;i++){
        let id = "fdm001"+i.toString()+"@fdm.co.uk";
        let sqlInsert = "INSERT INTO fdm_emails (fdm_email) VALUES (?)";
        conn.query(sqlInsert, id, (err, result) =>{
            if (err) throw err;
        });    
    }
    res.send("FDM emails created")
});

//Defining the route that creates the mentor data
app.get('/mentor', async (req,res) => {
    let pwd = "12345678"
    let hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    let sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm1',?,'John','Smith','I am a software engineer but I have also worked as a software developer so if you want I can check over your code and improve your programming skills. I can also help you become a much better communicator.','johnsmithsPic.png','johnsmith@outlook.com','07287773714')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "87654321"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm2',?,'Jeff','Smith','I am a test engineer looking to help anyone with their organisational skills and testing skills. I can teach you both the fundamentals and advanced testing concepts used in the industry.','jeffsPic.png','jeffsmith@outlook.com','07335858177')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "12344321"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm3',?,'Olivia','Johnson','As a consultant with experience in IT, banking, and much more, I have had the opportunity to improve my confidence and I want to share that with you.','oliviaPic.png','OliviaJohnson2107@outlook.com','07318678746')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });
    
    pwd = "11112222"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm8',?,'James','Jackson','Through my experiences as a HR representative and a recruiter for FDM, I can give you advice in areas to improve on as well as teach you important leadership skills','JamesJackson.png','JamesJackson07@gmail.com','07318678745')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "12345678"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm9',?,'Ronald','MD','I have working in information technology industry for over 25 years and have had experience as a consultant for FDM. I am really attentive to my mentees.','RonaldMD.png','RonaldBusinessEmail01@hotmail.com','07318669445')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "12345678"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);
    sqlInsert = "INSERT INTO mentor (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm10',?,'Stevey','Nokia','I am a hard working guy. I will do everything in my power to help you in any way. With 15 years of epxerience in business intelligence and programming, I like to think I have the ability to mentor the next generation of consultants.','steve.png','steve456@gmail.com','07318669433')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;   
        res.send("Mentors Inserted - check your table")
    });
});

//Defining the route that creates the mentee data
app.get('/mentee', async (req,res) => {
    pwd = "11122233"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    let sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0001@fdm.co.uk',?,'Emma','Black','I am a junior software engineer','EmmasPic.png','EmmaBlack4307@outlook.com','07186843817','fdm1')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "22336644"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);      
    sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0002@fdm.co.uk',?,'Amber','Brown','I am a junior Test Engineer. I desperately need help with time management and organisation.','ambersPic.png','AmberBrown9688@outlook.com','07232371894','fdm2')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "55881234"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0003@fdm.co.uk',?,'Annie','Smith','I am a software developer looking to improve my programming skills','AnnieSmithPic.png','AnnieSmith6723@outlook.com','07948525522','fdm1')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "12345678"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0004@fdm.co.uk',?,'Aesha','Black','I am a junior consultant looking to improve my communication skills','AeshasPic.png','AeshaBlack2998@outlook.com','07927655873','fdm3')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "89894242"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0005@fdm.co.uk',?,'Annie','Brown','I am a exforces software developer','AnnieBrownPic.png','AnnieBrown5894@outlook.com','07174628694','fdm1')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "12345678"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    sqlInsert = "INSERT INTO mentee (fdm_email, pwd, firstname, lastname, description, img, email, phone, mentor_id) VALUES ('fdm0006@fdm.co.uk',?,'Jeff','White','I am a post graduate looking to improve my confidence and communication','jeffsPic1.png','JeffWhite8427@outlook.com','07781899449','fdm3')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
        res.send("Mentees Inserted - check your table")
    });
});

//Defining the route that creates the mentor applicants data
app.get('/applicants', async (req,res) => {
    let pwd = "22233344"
    let hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    let sqlInsert = "INSERT INTO mentor_application (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm4',?,'Olivia','Williams','I am a long time FDM employee working in marketing. If you are looking to improve your marketing skills I am the perfect mentor for you','OliviaWilliamsPic.png','OliviaWilliams3060@outlook.com','07157896985')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "11223344"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);       
    sqlInsert = "INSERT INTO mentor_application (fdm_id, pwd, firstname, lastname, description, img, email, phone) VALUES ('fdm5',?,'Emma','Brown','I am an FDM HR rep' ,'EmmaBrown750Pic.png','EmmaBrown750@outlook.com','07944943581')";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;   
        res.send("Applicants Inserted - check your table")
    }); 
});

//Defining the route that creates the technician mock data
app.get('/technician', async (req,res) => {
    let pwd = "1234567812345678"
    let hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    let sqlInsert = "INSERT INTO technician (fdm_id, pwd) VALUES ('fdm6',?)";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;
    });

    pwd = "1234567887654321"
    hashedPwd = await bcyrpt.hash(pwd, saltRounds);   
    sqlInsert = "INSERT INTO technician (fdm_id, pwd) VALUES ('fdm7',?)";
    conn.query(sqlInsert, hashedPwd, (err, result) =>{
        if (err) throw err;   
        res.send("Technicians Inserted - check your table")
    }); 
});

//Defining the route that creates the areas of expertise for the mentors and applicants
app.get('/areasOfExpertise', (req,res) => {
    let sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm1',NULL,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0,1,1,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm2',NULL,1,0,1,0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,1)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm3',NULL,1,1,0,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm8',NULL,0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm9',NULL,0,1,0,0,1,1,0,0,0,0,0,0,0,1,1,1,0,1,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm10',NULL,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,1,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES (NULL,'fdm4',0,0,1,1,1,0,0,1,0,1,0,1,0,0,0,0,0,1,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_expertise (mentor_id, application_id, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES (NULL,'fdm5',1,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
        res.send("Areas of Expertise Inserted - check your table")
    });
});

//Defining the route that creates the areas of improvements for the mentors and applicants
app.get('/areasOfImprovements', (req,res) => {
    let sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0001@fdm.co.uk',1,0,1,0,0,1,1,0,0,0,0,0,0,1,0,1,1,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0002@fdm.co.uk',1,0,1,0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,1)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0003@fdm.co.uk',1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,1,0,1)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0004@fdm.co.uk',1,1,0,1,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0005@fdm.co.uk',1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
    });
    sqlInsert = "INSERT INTO areas_of_improvement (mentee_email, communication, confidence, time_management, teamwork, leadership, organisation, cloud_computing, sales, recruitment, marketing, hr, finance, academy, information_technology, consultant,programming, software_testing, business_intelligence, automation) VALUES ('fdm0006@fdm.co.uk',1,1,0,0,0,1,1,0,0,0,0,0,0,1,0,1,1,0,0)";
    conn.query(sqlInsert, (err, result) =>{
        if (err) throw err;
        res.send("Areas of Improvements Inserted - check your table")
    });
});

//Starting up express server at port 3001 because the app is running on port 3000
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
