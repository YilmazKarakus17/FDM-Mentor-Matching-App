import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './technician.css';

function TechnicianPage () {
    const[applicationList, setApplicationList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get/applicants/interval=5').then((response) => {
            setApplicationList(response.data)
        })
    }, [])

    //Calls API endpoints to create a mentor entry in the mentor table using the applicants fdm id
    const generateApplication = (fdmId) => {
        axios.post(`http://localhost:3001/api/insert/mentor/bulk-insert/${fdmId}`).then((response)=>{
           if (validateResponse(response)){
                axios.post(`http://localhost:3001/api/insert/areas-of-expertise/bulk-insert/${fdmId}`).then((response)=>{
                    if (validateResponse(response)){
                        axios.delete(`http://localhost:3001/api/delete/application/${fdmId}`).then((response)=>{
                            console.log(response)
                            window.location.reload(false);
                        });
                   }
                });
           }
        });  
    };

    //Calls API endpoints to delete the application from the database
    const deleteApplication = (fdmId) => {
        axios.delete(`http://localhost:3001/api/delete/application/${fdmId}`).then((response)=>{
            if (validateResponse(response)){
                window.location.reload(false);
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
                            <button id="generate-button" type="button" onClick={() => {generateApplication(val.fdm_id)}}>Generate</button>
                            <button id="decline-button" type="button"onClick={() => {deleteApplication(val.fdm_id)}}>Decline</button>
                        </div>
                    </div>
                )
            })}        
        </div>    
    )
}

export default TechnicianPage;