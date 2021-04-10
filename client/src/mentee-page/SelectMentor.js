//Importing React and React based modules
import React from 'react';

//Importing Axios for communicating with the server
import Axios from 'axios';

export default class SelectMentor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menteeFdmEmail: this.props.menteeFdmEmail,
            fdmId: this.props.fdmId,
            mentorDetail: {}
        }
    }

    componentWillMount(){
        Axios.get(`http://localhost:3001/api/get/mentor/${this.state.fdmId}`).then((response) => {
                console.log(response)
                this.setState({
                    mentorDetail: response.data[0]
                })
        });
    }

    render(){
        return(
            <div style={{backgroundColor:"grey", marginTop:"5%"}}>
                {this.state.fdmId}
                <div style={{color:"white"}}>
                    {this.state.menteeFdmEmail}
                    {this.state.mentorDetail.firstname}
                </div>
            </div>
        )
    }
}