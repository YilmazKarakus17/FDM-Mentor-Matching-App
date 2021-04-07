import axios from 'axios';
import React, { useEffect, useState } from 'react';
import emailjs from "emailjs-com";
import './technician.css';

function TechnicianPage () {
    const[applicationList, setApplicationList] = useState([]);
    var templateParams = {
        to_name: "",
        to_email: "",
        reply_to: "",
        answer: ""
    };

    emailjs.init("user_O5AdVF9894kjJ3m9aqCwr");

    useEffect(() => {
        axios.get('http://localhost:3001/api/get/applicants/interval=5').then((response) => {
            setApplicationList(response.data)
        })
    }, [])

    //Calls API endpoints to create a mentor entry in the mentor table using the applicants fdm id
    const generateApplication = (fdmId, firstname, email) => {
        axios.post(`http://localhost:3001/api/insert/mentor/bulk-insert/${fdmId}`).then((response)=>{
           if (validateResponse(response)){
                axios.post(`http://localhost:3001/api/insert/areas-of-expertise/bulk-insert/${fdmId}`).then((response)=>{
                    if (validateResponse(response)){
                        axios.delete(`http://localhost:3001/api/delete/application/${fdmId}`).then((response)=>{
                            console.log(response)
                            if(validateResponse(response)){
                                sendEmail(firstname,email,'Accepted')
                            }
                            window.alert('Email sent!')
                            window.location.reload();                              
                        });
                   }
                });
           }
        });  
    };

    //Calls API endpoints to delete the application from the database
    const deleteApplication = (fdmId, firstname, email) => {
        axios.delete(`http://localhost:3001/api/delete/application/${fdmId}`).then((response)=>{
            if (validateResponse(response)){
                if(validateResponse(response)){
                    sendEmail(firstname,email,'Declined')
                }  
                window.alert('Email sent!')
                window.location.reload();                            
            }
        })
       
    };

    //Function returns true if the response confirms entry was inserted
    const validateResponse = (response) => {
        if(response.data.affectedRows == 1){
            return true; 
        }
        if (response.data.code === "ER_DUP_ENTRY"){
            alert("Failed to generate account for applicant:\nMentor already exists in the System");
            return false;
        }
        if (response.data.code === "ECONNREFUSED"){
            alert("Failed to generate account:\nServer unable to connect to the database");
            return false;
        }
        alert("Unknown error occurred, please check server status")
        return false;
    }

    const sendEmail = (firstname,email,answer) => {
        templateParams.to_email = email
        templateParams.answer = answer
        templateParams.to_name = firstname
        emailjs.send("service_qz7s0yc", "template_k5vclo8", templateParams).then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
        );
    };

    return (
        <div id="technician-page-content"> 
            {applicationList.map((val)=>{
                return (
                    <div className="container card" key={val.fdm_id}>
                        <div className="row">        
                            <h1 className="col-6" style={{textAlign:"left"}}>{val.firstname} {val.lastname}</h1>
                            <h1 className="col-6" style={{textAlign:"right"}}>{val.fdm_id}</h1>
                        </div>
                        <div className="row">
                            <p className="col-6" style={{textAlign:"left"}}>Email: {val.email} </p>
                            <p className="col-6" style={{textAlign:"left"}}>Phone: {val.phone} </p>
                        </div>
                        <div className="row">
                            <p className="col-12" style={{textAlign:"left"}}>Description: {val.description} </p>
                        </div>
                        <div className="button-container row">
                            <button id="generate-button" type="button" onClick={() => {generateApplication(val.fdm_id, val.firstname, val.email)}}>Generate</button>
                            <button id="decline-button" type="button"onClick={() => {deleteApplication(val.fdm_id, val.firstname, val.email)}}>Decline</button>
                        </div>
                    </div>
                )
            })}        
        </div>    
    )
}

export default TechnicianPage;