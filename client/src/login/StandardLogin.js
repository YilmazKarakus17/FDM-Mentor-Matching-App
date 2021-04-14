//Importing React and it's modules
import React from 'react';

//Importing Axios in order to communicate with API
import Axios from 'axios';

//Importing Page Styling
import './LoginPages.css';

//Importing page validator
import LoginPageValidator from './LoginPageValidator';

export default class StandardLogin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
          loadPageContent: this.props.loadPageContent
        }
      }
    /*Signs in mentors and mentees by creating the necessary cookies and requesting page redirection from the app if the credentials are valid */
    signIn = () => {
        let uname = document.getElementById('username-input').value;
        let pwd = document.getElementById('pwd-input').value;
        let matched = false;
        let validator = new LoginPageValidator(document.getElementById('error-msg'));
        if (validator.userNameExists(uname)){
            if (validator.pwdExists(pwd)){
                //checks if the username is a fdm email or a fdm id
                if (validator.isEmail(uname))
                {
                    Axios.post('http://localhost:3001/api/get/mentee/credentials-check', {
                        fdmEmail: uname.toString(),
                        pwd: pwd.toString()
                    }).then((response) => {
                        matched = response.data.match;
                        if (!matched) {document.getElementById('error-msg').innerHTML = "Sign in Failed: Incorrect Mentee Credentials"}
                        else {
                            document.getElementById('error-msg').innerHTML = "";
                            //Saving mentee credentials in local storage
                            localStorage.setItem("fdmEmail", uname.toString());
                            localStorage.setItem("pwd", pwd.toString());
                            localStorage.removeItem("id"); // removing the fdm id key-value pair
                            this.state.loadPageContent();
                        }
                    });
                }
                else{
                    Axios.post('http://localhost:3001/api/get/mentor/credentials-check', {
                        id: uname.toString(),
                        pwd: pwd.toString()
                    }).then((response) => {
                        matched = response.data.match;
                        if (!matched) {document.getElementById('error-msg').innerHTML = "Sign in Failed: Incorrect Mentor Credentials"}
                        else {
                            document.getElementById('error-msg').innerHTML = "";
                            //Saving mentor credentials in local storage
                            localStorage.setItem("id", uname.toString());
                            localStorage.setItem("pwd", pwd.toString());
                            localStorage.removeItem("fdmEmail"); // removing fdm email key-value pair
                            this.state.loadPageContent();      
                        }
                    });  
                }
            }
        }
    }

    render(){
        return(
            <div id="sign-in-page" className='container'>
                <div className="row">
                    <div className="col-md-6 col-md-offset-6" id="sign-in-form">
                        <h3 className="font-weight-normal">Sign In</h3>
                        <div className="form-row mb-4">
                            <input className="form-control" type="text" name="fdm-id" id="username-input" placeholder="FDM Email / FDM ID"/>
                        </div>
                        <div className="form-row mb-4">
                            <input className="form-control" type="password" name="pwd" id="pwd-input" placeholder="Password"/>
                        </div>
                        <div className="form-row mb-4">
                            <small id="error-msg" className="form-text text-danger"></small>
                            <button className="btn btn-primary col-12" onClick={() => this.signIn()}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}