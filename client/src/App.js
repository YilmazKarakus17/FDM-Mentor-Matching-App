import React from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  myPostFunction(){
    Axios.post('http://localhost:3001/api/get/technician/credentials-check', {fdmEmail: "fdm6", pwd: "1234567812345678"}).then((response) => {
      console.log(response)
    });
  }

  render(){
    //logic code
    return (
      <div id="app">
        <button onClick={this.myPostFunction}>Post</button>
      </div>
    )
  }
}

