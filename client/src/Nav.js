import React from 'react';
import './Nav.css';

export default class Nav extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    //logic code
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
        <div className="mx-auto order-0">
          <button className="navbar-brand mx-auto" id="hompage-button">FDM Mentor Matcher</button>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
           <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">    
          <ul class="navbar-nav ml-auto">
            <button className="nav-item" id="logout-button">Logout</button>
         </ul>
        </div>
      </nav>
    )
  }
}
