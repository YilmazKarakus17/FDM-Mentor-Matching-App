//Importing React and React based modules
import React from 'react';
import ReactDOM from 'react-dom';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing Child Components
import SearchMentor from './SearchMentor'
import EditMenteeProfile from '../edit-profile-page/EditMenteeProfile';

//Importing styling
import './MenteePage.css'

export default class MenteePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fdmEmail: this.props.fdmEmail,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            desc: "",
            hasMentor: false,
            pageLoadedSuccessfully: false,
            mentor: {}
        }
    }

    //setter method used to set the mentor object to contain the details of the mentees mentor
    setMentor = (mentor) => {
        this.setState({
            mentor: mentor
        });
    }

    //setter method used to set the details of the mentee
    setMenteeDetails = (menteeDetails) => {
        this.setState({
            firstName: menteeDetails.firstname,
            lastName: menteeDetails.lastname,
            email: menteeDetails.email,
            phone: menteeDetails.phone,
            desc: menteeDetails.description
        });
    }

    //Renders edit profile page content in the account-details-content div
    editProfile = () => {
        ReactDOM.render(
                <EditMenteeProfile reloadContent={this.reloadContent} 
                    fdmEmail={this.state.fdmEmail} firstname={this.state.firstName} lastname={this.state.lastName}
                    email={this.state.email} phone={this.state.phone} description={this.state.desc} />, 
            document.getElementById('account-details-content'));
    }

    //Function returns true if the API response confirms the request was successful
    validateResponse = (response) => {
        if (response.data.code === "ECONNREFUSED"){
            alert("API cannot connect to the database");
            return false;
        }
        if (response.data.length == 0){
            alert("Unable to load mentee details: fdm Email doesn't exist in the database")
            return false;
        }
        return true;
    }

    //Reloads the page
    reloadContent = () =>{
        window.location.reload();
    }

    componentWillMount(){
        Axios.get(`http://localhost:3001/api/get/mentee/${this.state.fdmEmail}`).then((response) => {
            if (this.validateResponse(response)){
                this.setMenteeDetails(response.data[0])
                let mentorId = response.data[0].mentor_id;
                if (mentorId != null){
                    Axios.get(`http://localhost:3001/api/get/mentor/exclude=pwd/${this.state.fdmEmail}`).then((response) => {
                        if (this.validateResponse(response)){
                            this.setState({
                                hasMentor: true
                            }); 
                            this.setMentor(response.data[0])
                        }
                    });
                }
                this.setState({
                    pageLoadedSuccessfully: true
                }); 
            }
          });
    }

    render(){
        let pageContent;
        if(this.state.hasMentor){
            pageContent = 
            <div id="mentor-details" className="container">
                <div className="row">
                    <h5 className="col-12">Your Mentor</h5>
                </div>
                <div className="card">
                    <button className="card-header" data-toggle="collapse" href="#MentorDetails">
                        {this.state.mentor.firstname} {this.state.mentor.lastname}
                    </button>
                    <div id="MentorDetails" className="collapse" data-parent="#mentor-details">
                        <div className="card-body">
                            <div className="table-responsive-lg">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td><a href={"mailto:" + this.state.mentor.email}>{this.state.mentor.email}</a></td>
                                            <th>Phone</th>
                                            <td><a href={"tel:"+this.state.mentor.phone}>{this.state.mentor.phone}</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        else{
            pageContent = 
                <SearchMentor reloadContent={this.reloadContent} fdmEmail={this.state.fdmEmail} />
        }

        let editProfileBtn;
        if (this.state.pageLoadedSuccessfully){
            editProfileBtn = 
            <button className="btn btn-primary" onClick={this.editProfile}>Edit Profile</button>
        }
        else{
            editProfileBtn = <div className="col-12">Page needs to load successfully</div>
        }
        return(
            <div id="mentee-page-content" className="container">
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
                <div className="row">
                    {pageContent}
                </div>
            </div>
        )
    }  
}
