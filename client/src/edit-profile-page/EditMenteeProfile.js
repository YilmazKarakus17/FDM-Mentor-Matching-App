//Importing React and React based modules
import React from 'react';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing Auxiliary Classes
import EditProfilePageValidator from './EditProfilePageValidator'

export default class EditMenteeProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reloadContent: this.props.reloadContent,
            fdmEmail: this.props.fdmEmail,
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
            alert("Unable to update account details, fdm email doesn't exist")
            return false
        }
        return true;
    }

    //Function does a api request to update the firstname attribute of the mentee
    async updateFirstName(firstname){
        const response = await Axios.put('http://localhost:3001/api/update/mentee/firstname',{ firstname: firstname, fdmEmail: this.state.fdmEmail});
        return await response
    }

    //Function does a api request to update the lastname attribute of the mentee
    async updateLastName(lastname){
        const response = await Axios.put('http://localhost:3001/api/update/mentee/lastname',{lastname: lastname, fdmEmail: this.state.fdmEmail});
        return await response
    }

    //Function does a api request to update the email attribute of the mentee
    async updateEmail(email){
        const response = await Axios.put('http://localhost:3001/api/update/mentee/email',{email: email, fdmEmail: this.state.fdmEmail});
        return await response
    }

    //Function does a api request to update the phone attribute of the mentee
    async updatePhone(phone){
        const response = await Axios.put('http://localhost:3001/api/update/mentee/phone',{phone: phone, fdmEmail: this.state.fdmEmail});
        return await response
    }

    //Function does a api request to update the description attribute of the mentee
    async updateDescription(description){
        const response = await Axios.put('http://localhost:3001/api/update/mentee/description',{description: description, fdmEmail: this.state.fdmEmail});
        return await response
    }

    /* Method which attempts to update the firstname if the user made any changes to their last name, 
        then regardless of whether the user had made a change to the firstname it calls the updateLastNameOnwards method */
    updateFirstNameOnwards(updatedAccountDetails,originalAccountDetails){
        if(updatedAccountDetails.firstname != originalAccountDetails.firstname){
            this.updateFirstName(updatedAccountDetails.firstname).then((response) => {
                if (this.validateResponse(response)){
                    this.updateLastNameOnwards(updatedAccountDetails,originalAccountDetails);
                }
            });
        }
        else{
            this.updateLastNameOnwards(updatedAccountDetails,originalAccountDetails);
        }
    }

    /* Method which attempts to update the lastname if the user made any changes to their last name, 
        then regardless of whether the user had made a change to the last name it calls the updateEmailOnwards method */
    updateLastNameOnwards(updatedAccountDetails,originalAccountDetails){
        if(updatedAccountDetails.lastname != originalAccountDetails.lastname){
            this.updateLastName(updatedAccountDetails.lastname).then((response) => {
                if (this.validateResponse(response)){
                    this.updateEmailOnwards(updatedAccountDetails,originalAccountDetails);
                }
            });
        }
        else{
            this.updateEmailOnwards(updatedAccountDetails,originalAccountDetails);
        }
    }

    /* Method which attempts to update the email if the user made any changes to their last name, 
        then regardless of whether the user had made a change to the email it calls the updatePhoneOnwards method */
    updateEmailOnwards(updatedAccountDetails,originalAccountDetails){
        if(updatedAccountDetails.email != originalAccountDetails.email){
            this.updateEmail(updatedAccountDetails.email).then((response) => {
                if (this.validateResponse(response)){
                    this.updatePhoneOnwards(updatedAccountDetails,originalAccountDetails);
                }
            });
        }
        else{
            this.updatePhoneOnwards(updatedAccountDetails,originalAccountDetails);
        }
    }

    /* Method which attempts to update the phone if the user made any changes to their last name, 
        then regardless of whether the user had made a change to the phone it calls the updateDescriptionOnwards method */
    updatePhoneOnwards(updatedAccountDetails,originalAccountDetails){
        if(updatedAccountDetails.phone != originalAccountDetails.phone){
            this.updatePhone(updatedAccountDetails.phone).then((response) => {
                if (this.validateResponse(response)){
                    this.updateDescriptionOnwards(updatedAccountDetails,originalAccountDetails);
                }
            });
        }
        else{
            this.updateDescriptionOnwards(updatedAccountDetails,originalAccountDetails);
        }
    }

    /* Method which attempts to update the description if the user made any changes to their last name, 
        then regardless of whether the user had made a change to the description it calls the parent components reloadContent method */
        updateDescriptionOnwards(updatedAccountDetails,originalAccountDetails){
            if(updatedAccountDetails.description != originalAccountDetails.description){
                this.updateDescription(updatedAccountDetails.description).then((response) => {
                    if (this.validateResponse(response)){
                        this.state.reloadContent();
                    }
                });
            }
            else{
                this.state.reloadContent();
            }
        }

    submitHandler = () => {
        let updatedAccountDetails = this.getUpdatedAccountDetails();
        let originalAccountDetails = this.getOriginaldAccountDetails();
        let validator = new EditProfilePageValidator(updatedAccountDetails, document.getElementById('error-msg'));
        if(validator.validate()){
            this.updateFirstNameOnwards(updatedAccountDetails,originalAccountDetails);
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