//Importing React and React based modules
import React, { useEffect, useState } from 'react';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing classes
import UserMatchingVector from './UserMatchingVector'
import UserMatchingVectorIterator from './UserMatchingVectorIterator'

export default function SearchMentor(){
    const[fdmEmail, setFdmEmail] = useState('fdm0001@fdm.co.uk')
    const[menteeVector, setMenteeVector] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/get/areas-of-improvements/${fdmEmail}`).then((response) =>{
            if (response.data.length == 0){
                alert("Error occurred mentee areas of improvement doesn't exist")
            }
            else{
                // for (let i = 0; i<=19; i++){

                // }
                //{menteeVector}

                let userMatchingVector = new UserMatchingVector(response.data[0]);
                let iterator = userMatchingVector.Iterator()
                setMenteeVector(userMatchingVector); //Setting the mentee vector to the integer representation of the mentees areas of improvement
            }
        });
    }, [])


    return (
        <div>
            
        </div>
    )
}

