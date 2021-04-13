//Importing React and it's modules
import React from 'react';

//Importing Axios in order to communicate with API
import Axios from 'axios';

//Importing Page Styling
import './LoginPages.css';

//Importing page validator
import LoginPageValidator from './LoginPageValidator';

export default class TechnicianLogin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
          loadPageContent: this.props.loadPageContent
        }
      }

    /*Signs in technicians by creating the necessary cookies and requesting page redirection from the app if the credentials are valid */
    signIn = () =>{
        //Retrieving the sign in credentials from the input elements
        let id = document.getElementById('fdm-id-input').value;
        let pwd = document.getElementById('pwd-input').value;
        //Declaring variable used in checking whether the entered credentials match a existing technician account
        let matched = false;
        //Creating a validator object to validate the inputs
        let validator = new LoginPageValidator(document.getElementById('error-msg'));

        if (validator.fdmIdExists(id)){
            if (validator.pwdExists(pwd)){
                //Making API call to check if the entered credentials exist in an account in the fdm database
                Axios.post('http://localhost:3001/api/get/technician/credentials-check', {
                    id: id.toString(),
                    pwd: pwd.toString()
                }).then((response) => {
                    /*A promise which checks the API response and if the credentials are a match with an existing accounts credentials 
                        creates the necessary cookie and calls parent components redirect function */
                    matched = response.data.match;
                    if (!matched) {document.getElementById('error-msg').innerHTML = "Sign in Failed: Incorrect Credentials"}
                    else {
                        document.getElementById('error-msg').innerHTML = "";
                        //Saving credentials in local storage
                        localStorage.setItem("id", id.toString());
                        localStorage.setItem("pwd", pwd.toString());
                        localStorage.removeItem("fdmEmail"); // removing fdm email key-value pair
                        this.state.loadPageContent();   
                    }
                });
            }
        }
    }

    render(){
        return(
            <div id="sign-in-page" className='container'>
                <div className="row">
                    <div className="col-md-6 col-md-offset-6" id="sign-in-form">
                        <h3 className="font-weight-normal">Technician Sign In</h3>
                        <div className="form-row mb-4">
                            <input className="form-control" type="text" name="fdm-id" id="fdm-id-input" placeholder="Technician ID"/>
                        </div>
                        <div className="form-row mb-4">
                            <input className="form-control" type="password" name="pwd" id="pwd-input" placeholder="Password"/>
                        </div>
                        <div className="form-row mb-4">
                            <small id="error-msg" className="form-text text-danger"></small>
                            <button className="btn btn-primary col-12" onClick={this.signIn}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}