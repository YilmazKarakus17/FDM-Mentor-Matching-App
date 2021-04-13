//Importing React and React based modules
import React from 'react';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing Auxiliary Classes
import EditProfilePageValidator from './EditProfilePageValidator'

export default class EditMentorProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reloadContent: this.props.reloadContent,
            fdmId: this.props.fdmId,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            phone: this.props.phone,
            description: this.props.description
        }
    }

    //Returns a object of key value pairs with each key representing a distinct input field's value
    getUpdatedAccountDetails = () => {
        return {
            firstname: document.getElementById('firstname').value, 
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            description: document.getElementById('description').value
        }
    }

    //Returns a object of key value pairs with each key representing a distinct account attribute
    getOriginaldAccountDetails = () => {
        return {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            description: this.state.description
        }
    }

    //Function returns true if the API response confirms the request was successful
    validateResponse = (response) => {
        if (response.data.code === "ECONNREFUSED"){
            alert("API cannot connect to the database");
            return false;
        }
        if (response.data.affectedRows == 0){
            alert("Unable to update account details, invalid fdm id")
            return false
        }
        return true;
    }

    //Returns true if a change has been made
    detailsHaveChanged = (originalAccountDetails,updatedAccountDetails) => {
        if (updatedAccountDetails.firstname != originalAccountDetails.firstname){
            return true;
        }
        if (updatedAccountDetails.lastname != originalAccountDetails.lastname){
            return true;
        }
        if (updatedAccountDetails.email != originalAccountDetails.email){
            return true;
        }
        if (updatedAccountDetails.phone != originalAccountDetails.phone){
            return true;
        }
        if (updatedAccountDetails.description != originalAccountDetails.description){
            return true;
        }
        return false;
    }

    //Event handler for the button used to submit the new profile details if a change has happened
    submitHandler = () => {
        let updatedAccountDetails = this.getUpdatedAccountDetails();
        let originalAccountDetails = this.getOriginaldAccountDetails();
        let validator = new EditProfilePageValidator(updatedAccountDetails, document.getElementById('error-msg'));
        if(validator.validate()){
            if(this.detailsHaveChanged(originalAccountDetails,updatedAccountDetails)){
                Axios.put('http://localhost:3001/api/update/mentor/details',{
                    firstname: updatedAccountDetails.firstname,
                    lastname: updatedAccountDetails.lastname,
                    email: updatedAccountDetails.email,
                    phone: updatedAccountDetails.phone,
                    description: updatedAccountDetails.description,
                    fdmId: this.state.fdmId
                }).then((response) => {
                    if(this.validateResponse(response)){
                        this.state.reloadContent();
                    }
                });
            }
            else{
                this.state.reloadContent();
            }
        }
    }

    render(){
        return (
            <div className="container" id="edit-profile-page">
                <div className="row">
                    <h5 className="col-12">Account Details</h5>
                </div>
                <div className="table-responsive-lg">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">First Name</th>
                                <td><input className="form-control" defaultValue={this.state.firstname} placeholder="First Name" type="text" name="firstname" id="firstname"/></td>
                            </tr>
                            <tr>
                                <th scope="row">Last Name</th>
                                <td><input className="form-control" defaultValue={this.state.lastname} placeholder="Last Name" type="text" name="lastname" id="lastname" /></td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td><input className="form-control" defaultValue={this.state.email} placeholder="Email" type="email" name="email" id="email" /></td>
                            </tr>
                            <tr>
                                <th scope="row">Phone</th>
                                <td><input className="form-control" placeholder="Phone" defaultValue={this.state.phone} type="phone" name="phone" id="phone" /></td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td><textarea className="form-control" type="text" name="description" id="description" placeholder="Description" defaultValue={this.state.description}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <small id="error-msg" className="col-12 form-text text-danger"></small>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary col-6" onClick={this.state.reloadContent}>Back</button>
                        <button className="btn btn-primary col-6" onClick={this.submitHandler}>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}