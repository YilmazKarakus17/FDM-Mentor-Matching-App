import React, { Component } from "react";
//import validator from 'validator';
import Axios from 'axios';

export default class MenteeSignUp extends Component {
  constructor(props) {
      super(props);
    }

  validate(){
 
    if (document.getElementById('fdm_id').value <3) {
      document.getElementById('error-id').innerHTML = "Error: short fdm id"
      console.log("needs at least 3 characters")
      return false
    }
    if (document.getElementById('firstname').value.length ==0 || document.getElementById('lastname').value.length ==0){
      console.log("input name")
      document.getElementById('error-f').innerHTML = "Error: First name or last name empty"
      return false
    }
    if (document.getElementById('pwd').value.length ==0 || document.getElementById('pwd').value.length <6){
      document.getElementById('error-pwd').innerHTML = "Error: Short password, at least 6 characters"
      console.log("minimum 6 characters")
      return false
    }
    if(document.getElementById('description').value.length <20){
      document.getElementById('error-desc').innerHTML = "Error: Failed! Short description"
      console.log("needs at least 20 characters")
      return false
    }
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test('phone') ){
      console.log("wrong phone format")
      document.getElementById('error-phone').innerHTML = "Error: Wrong phone number, must pe 10 digits."
      return false
    }
    if(document.getElementById('email').value.length !=0 && !document.getElementById('email').value.includes('@')){
      console.log("invalid email address")
      document.getElementById('error-email').innerHTML = "Error: Wrong email format"
      return false
    }
    return true
  }

  submitEventHandler = () =>{
    if (this.validate()){
      Axios.post('http://localhost:3001/api/insert/mentor-application',{
        id: document.getElementById('fdm_id').value,
        pwd: document.getElementById('pwd').value,
        fname: document.getElementById('firstname').value,
        lname: document.getElementById('lastname').value,
        desc: document.getElementById('description').value,
        img: "defaultImg.png",
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
      }).then((response) =>{
        console.log(response);
      });
    }
  }

  render(){
    return(
      <div className="wrapper">
      <div className="form-wrapper">
          <h1>Create Account</h1>
          <input className="" placeholder="First Name" type="text" name="firstname" id="firstname"/>
          <small id="error-f" className="form-text text-danger"></small>

          <input className="" placeholder="Last Name" type="text" name="lastname"id="lastname" />
          <small id="error-l" className="form-text text-danger"></small>

          <input className="" placeholder="Fdm Id" type="fdm_id" name="fdm_id"id="fdm_id" />
          <small id="error-id" className="form-text text-danger"></small>

          <input className="" placeholder="Password" type="password" name="pwd" id="pwd" />
          <small id="error-pwd" className="form-text text-danger"></small>

          <input className="" placeholder="Description" type="description" name="description" id="description" />
          <small id="error-desc" className="form-text text-danger"></small>

          <input className="" placeholder="Email" type="email" name="email" id="email" />
          <small id="error-email" className="form-text text-danger"></small>
          
          <input className="" placeholder="Phone" type="phone" name="phone" id="phone" />
          <small id="error-phone" className="form-text text-danger"></small>

          <button onClick={() => this.submitEventHandler()}>Submit</button>
      </div>
    </div>
    )
  }
}