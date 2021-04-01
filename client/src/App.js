import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Nav from './Nav';

// eslint-disable-next-line
import TechnicianLogin from './login/TechnicianLogin'
import StandardLogin from './login/StandardLogin'

export default class App extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    //logic code
    return (
      <div id="app">
        <header id="header-content">
          <Nav />
        </header>
        <div id="page-content">
          <TechnicianLogin />
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

