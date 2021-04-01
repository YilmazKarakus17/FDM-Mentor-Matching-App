import React from 'react';
import './Nav.css';

export default class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      landingRedirect: this.props.landingRedirect
    }
  }


  render(){
    //logic code
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
        <div className="mx-auto order-0">
          <button className="navbar-brand mx-auto" id="hompage-button" onClick={() => {this.state.landingRedirect()}}>FDM Mentor Matcher</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
           <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">    
          <ul className="navbar-nav ml-auto">
            <button className="nav-item" id="logout-button">Logout</button>
         </ul>
        </div>
      </nav>
    )
  }
}
