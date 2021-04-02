import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Nav from './Nav';

// eslint-disable-next-line
import TechnicianLogin from './login/TechnicianLogin'
import StandardLogin from './login/StandardLogin'
import LandingPage from './LandingPage'
import MentorSignUp from './signup-page/MentorSignUp'
import MenteeSignUp from './signup-page/MenteeSignUp'

export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.loadPageContent();
  }

  //Method used to change the current page content to be the landing page
  landingRedirect = () => {
    ReactDOM.render(<LandingPage standardLoginRedirect={this.standardLoginRedirect} technicianLoginRedirect={this.technicianLoginRedirect} 
      menteeSignUpRedirect={this.menteeSignUpRedirect} mentorApplicationRedirect={this.mentorApplicationRedirect} />, 
      document.getElementById('page-content')
    );
    this.renderNav();
  }

  //Method used to change the current page content to be the standard login page
  standardLoginRedirect = () => {
    ReactDOM.render(<StandardLogin loadPageContent={this.loadPageContent} />, document.getElementById('page-content'))
    this.renderNav();
  }

  //Method used to change the current page content to be the technician login page
  technicianLoginRedirect = () =>{
    ReactDOM.render(<TechnicianLogin loadPageContent={this.loadPageContent} />, document.getElementById('page-content'))
    this.renderNav();
  }

   //Method used to change the current page content to be the mentee signup page
   menteeSignUpRedirect = () => {
    ReactDOM.render(<MenteeSignUp />, document.getElementById('page-content'));
    this.renderNav();
  }

  //Method used to change the current page content to be the mentor application page
  mentorApplicationRedirect = () => {
    ReactDOM.render(<MentorSignUp />, document.getElementById('page-content'));
    this.renderNav();
  }

  //Method re renders a Nav component into the DOM
  renderNav = () => {
    //replaces the Nav component with a new Nav so that it's updated
    ReactDOM.render(<Nav loadPageContent={this.loadPageContent} />, 
      document.getElementById('header-content')
    );
  }

  //Loads the correct component to be used for page content, based on whether the user is already logged in and on which account
  loadPageContent = () => {
    if (("fdmEmail" in localStorage) && ("pwd" in localStorage))
    {
      Axios.post('http://localhost:3001/api/get/mentee/credentials-check', {
        fdmEmail: localStorage.getItem("fdmEmail"),
        pwd: localStorage.getItem("pwd")
      }).then((response) => {
        if (response.data.match){
          alert("Mentee logged In")
        }
        else{
          localStorage.removeItem("fdmEmail");
          localStorage.removeItem("pwd");
          this.landingRedirect();
          alert("Login credentials expired please try logging in again");
        }
      });
    }
    else if (("id" in localStorage) && ("pwd" in localStorage)){
      Axios.post('http://localhost:3001/api/get/mentor/credentials-check', {
        id: localStorage.getItem("id"),
        pwd: localStorage.getItem("pwd")  
      }).then((response) => {
        if (response.data.match){
          alert("mentor signed in")
        }
        else{
          Axios.post('http://localhost:3001/api/get/technician/credentials-check', {
            id: localStorage.getItem("id"),
            pwd: localStorage.getItem("pwd") 
          }).then((response) => {
            if (response.data.match){
              alert("technician signed in")
            }
            else{
              localStorage.removeItem("id");
              localStorage.removeItem("pwd");
              this.landingRedirect();
              alert("Login credentials expired please try logging in again");
            }
          });
        }
      });
    }
    else{
      this.landingRedirect();
    }
  }

  render(){
    return (
      <div id="app">
        <header id="header-content">
          <Nav loadPageContent={this.loadPageContent} />
        </header>
        <div id="page-content">

        </div>
        <footer className="page-footer font-small pt-4" id="footer-content">
          <h6>
            FDM Mentor Matcher © 2021 Group 16
          </h6>
        </footer>
      </div>
    )
  }
}

