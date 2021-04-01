import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Nav from './Nav';

// eslint-disable-next-line
import TechnicianLogin from './login/TechnicianLogin'
import StandardLogin from './login/StandardLogin'
import LandingPage from './LandingPage'

export default class App extends React.Component{
  constructor(props){
    super(props)
  }


  //Loads the correct component to be used for page content, based on whether the user is already logged in and on which account
  loadPageContent(){
    if ((("fdmEmail" in localStorage) && ("pwd" in localStorage)) || (("id" in localStorage) && ("pwd" in localStorage)))
    {

    }
    else{
      // ReactDOM.render(<LandingPage />, 
      //   document.getElementById('page-content')
      // );
    }
  }

  render(){
    //logic code
    return (
      <div id="app">
        <header id="header-content">
          <Nav />
        </header>
        <div id="page-content">
          <LandingPage />
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

