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

    const generateApplication = (application) => {
        axios.post(`http://localhost:3001/api/insert/mentor/bulk-insert/${application}`).then((response)=>{
            console.log(response)
        })
        axios.post(`http://localhost:3001/api/insert/areas-of-expertise/bulk-insert/${application}`).then((response)=>{
            console.log(response)
        })
        axios.delete(`http://localhost:3001/api/delete/application/${application}`).then((response)=>{
            console.log(response)
            window.location.reload(false);
        })
        
    };

    const deleteApplication = (application) => {
        axios.delete(`http://localhost:3001/api/delete/application/${application}`).then((response)=>{
            console.log(response)
            window.location.reload(false);
        })
       
    };
    return (
        <div id="content"> 
            {applicationList.map((val)=>{
                return (
                <div class="container">
                    <div class = "card">
                    <h1>FDM ID: {val.fdm_id}</h1>
                    <h1>Name: {val.firstname} {val.lastname}</h1>
                    <p>Desc: {val.description} </p>
                    <p>Email: {val.email} </p>
                    <p>[Phone]: {val.phone} </p>
                        <div>
                            <button class = "button button1" type="button" onClick={() => {generateApplication(val.fdm_id)}}>Generate</button>
                            <button class = "button button2" type="button"onClick={() => {deleteApplication(val.fdm_id)}}>Decline</button>
                        </div>
                    </div>
                </div>
                )
            })}        
        </div>    
    )
}

export default TechnicianPage;