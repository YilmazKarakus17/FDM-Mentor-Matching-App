import React, { Component } from "react";
//import validator from 'validator';
import Axios from 'axios';

export default class MentorSignUp extends Component {
  constructor(props) {
      super(props);
    }

  validate(){

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
          <input className="" placeholder="Last Name" type="text" name="lastname"id="lastname" />
          <input className="" placeholder="Fdm Id" type="fdm_id" name="fdm_id"id="fdm_id" />
          <input className="" placeholder="Password" type="password" name="pwd" id="pwd" />
          <input className="" placeholder="Description" type="description" name="description" id="description" />
          <input className="" placeholder="Email" type="email" name="email" id="email" />
          <input className="" placeholder="Phone" type="phone" name="phone" id="phone" />
          <button onClick={() => this.submitEventHandler()}>Submit</button>
      </div>
    </div>
    )
  }
}
