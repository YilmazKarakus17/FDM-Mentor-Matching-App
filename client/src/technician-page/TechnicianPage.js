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
        <div id="content"> 
            {applicationList.map((val)=>{
                return (
                    <div className="container" key={val.fdm_id}>
                        <div className = "card">
                        <h1>FDM ID: {val.fdm_id}</h1>
                        <h1>Name: {val.firstname} {val.lastname}</h1>
                        <p>Desc: {val.description} </p>
                        <p>Email: {val.email} </p>
                        <p>[Phone]: {val.phone} </p>
                            <div>
                                <button className = "button button1" type="button" onClick={() => {generateApplication(val.fdm_id)}}>Generate</button>
                                <button className = "button button2" type="button"onClick={() => {deleteApplication(val.fdm_id)}}>Decline</button>
                            </div>
                        </div>
                    </div>
                )
            })}        
        </div>    
    )
}

export default TechnicianPage;