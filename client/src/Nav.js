import React from 'react';
import ReactDOM from 'react-dom';
import './Nav.css';
import Axios from 'axios';

export default class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      loadPageContent: this.props.loadPageContent
    }
  }

  //removes the logout button from the DOM
  removeLogoutBtn = () =>{
    const emptyElement = React.createElement('div',{ },'');
    ReactDOM.render(emptyElement,document.getElementById('logout-btn-container'))
  }

  //renders a logout button in the Nav component
  createLogoutButton = () =>{
    //<button className="nav-item" id="logout-button">Logout</button>
    const btn = React.createElement('button',{ id:"logout-button", className:"nav-item", onClick:() => this.logoutEventHandler()},'Logout');
    ReactDOM.render(btn, document.getElementById('logout-btn-container'))
  }

  logoutEventHandler = () => {
    localStorage.removeItem("fdmEmail");
    localStorage.removeItem("id");
    localStorage.removeItem("pwd");
    this.state.loadPageContent();
  }

  render(){
    //logic code
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
        <div className="mx-auto order-0">
          <button className="navbar-brand mx-auto" id="hompage-button" onClick={() => {this.state.loadPageContent()}}>FDM Mentor Matcher</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
           <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">    
          <ul className="navbar-nav ml-auto" id="logout-btn-container">
            
         </ul>
        </div>
      </nav>
    )
  }
}
