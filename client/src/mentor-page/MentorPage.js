//Importing React and React based modules
import React from 'react';
import ReactDOM from 'react-dom';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing Child Components
import EditMentorProfile from '../edit-profile-page/EditMentorProfile';

//Importing the styling
import './MentorPage.css'

export default class MentorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fdmId: this.props.fdmId,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            desc: "",
            pageLoadedSuccessfully: false,
            mentees: []
        }
    }

    //setter method used to set the mentees array to contain the details of the mentors mentees
    setMentees = (mentees) => {
        this.setState({
            mentees: mentees
        });
    }

    //setter method used to set the details of the mentor
    setMentorDetails = (mentorDetails) => {
        this.setState({
            firstName: mentorDetails.firstname,
            lastName: mentorDetails.lastname,
            email: mentorDetails.email,
            phone: mentorDetails.phone,
            desc: mentorDetails.description
        });
    }

    //Function returns true if the API response confirms the request to get mentors details was successful
    validateGetMentorResponse = (response) => {
        if (response.data.code === "ECONNREFUSED"){
            alert("API cannot connect to the database");
            return false;
        }
        if (response.data.length == 0){
            alert("Unable to load mentor details: fdm id doesn't exist in the database");
            return false;
        }
        return true;
    }

    //Function returns true if the API response confirms the request to get the mentees was successful
    validateGetMenteesResponse = (response) => {
        if (response.data.code === "ECONNREFUSED"){
            alert("API cannot connect to the database");
            return false;
        }
        return true;
    }

    //Renders edit profile page content in the account-details-content div
    editProfile = () => {
        ReactDOM.render(
                <EditMentorProfile reloadContent={this.reloadContent} 
                    fdmId={this.state.fdmId} firstname={this.state.firstName} lastname={this.state.lastName}
                    email={this.state.email} phone={this.state.phone} description={this.state.desc} />, 
            document.getElementById('account-details-content'));
    }

    //Reloads the page
    reloadContent = () =>{
        window.location.reload();
    }

    componentWillMount(){
        Axios.get(`http://localhost:3001/api/get/mentor/${this.state.fdmId}`).then((response) => {
            if (this.validateGetMentorResponse(response)){
                this.setMentorDetails(response.data[0])
                Axios.get(`http://localhost:3001/api/get/mentor/mentees/${this.state.fdmId}`).then((response) => {
                    if (this.validateGetMenteesResponse(response)){
                        this.setState({
                            pageLoadedSuccessfully: true
                        }); 
                        this.setMentees(response.data)
                    }
                });
            }
          });
    }

    render(){
        let editProfileBtn;
        if (this.state.pageLoadedSuccessfully){
            editProfileBtn = 
            <button className="btn btn-primary" onClick={this.editProfile}>Edit Profile</button>
        }
        else{
            editProfileBtn = <div className="col-12">Page needs to load successfully</div>
        }
        return(
            <div id="mentor-page-content" className="container">
                <div className="row">
                    <h2 className="col-12 page-heading">Welcome, {this.state.firstName}</h2>
                </div>
                <div className="row" id="account-details-content">
                    <div className="container">
                        <div className="row">
                            <h5 className="col-12">Account Details</h5>
                        </div>
                        <div className="table-responsive-lg">
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="row">First Name</th>
                                        <td>{this.state.firstName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Name</th>
                                        <td>{this.state.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone</th>
                                        <td>{this.state.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Description</th>
                                        <td>{this.state.desc}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {editProfileBtn}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mentees-content">
                    <div className="container">
                        <div className="row">
                            <h5 className="col-12">Your Mentees</h5>
                        </div>
                        <div id="mentee-list">
                            {this.state.mentees.map((mentee) => {
                                return(
                                        <div key={mentee.fdm_email} className="card">
                                            <button className="card-header" data-toggle="collapse" href={"#"+mentee.fdm_email.replaceAll('.',"").replaceAll('@',"")+"Details"}>
                                                {mentee.firstname} {mentee.lastname}
                                            </button>
                                            <div id={mentee.fdm_email.replaceAll('.',"").replaceAll('@',"")+"Details"} className="collapse" data-parent="#mentee-list">
                                                <div className="card-body">
                                                    <div className="table-responsive-lg">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">FDM Email</th>
                                                                    <td><a href={"mailto:" + mentee.fdm_email}>{mentee.fdm_email}</a></td>
                                                                    <th></th>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">First Name</th>
                                                                    <td>{mentee.firstname}</td>
                                                                    <th>Last Name</th>
                                                                    <td>{mentee.lastname}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Email</th>
                                                                    <td><a href={"mailto:" + mentee.email}>{mentee.email}</a></td>
                                                                    <th>Phone</th>
                                                                    <td><a href={"tel:" + mentee.phone}>{mentee.phone}</a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

