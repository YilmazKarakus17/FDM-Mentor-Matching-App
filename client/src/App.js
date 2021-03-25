import React from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  myPostFunction(){
    Axios.put('http://localhost:3001/api/update/mentee/mentor-id', {
      mentorId: "fdm2",
      fdmEmail: "fdm0007@fdm.co.uk"
    }).then((response) => {
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

// Axios.post('http://localhost:3001/api/insert/mentee', {
//   fdmEmail: 'fdm0007@fdm.co.uk',
//   pwd: '12345',
//   fname: 'jo-allan',
//   lname: 'smith',
//   desc: 'software engineer, good at testing',
//   img: 'testImage.pic',
//   email: 'joAllan@outlook.com',
//   phone: '07958585145'
// }).then((response) => {
//   console.log(response)
// });


// let fdmId = 'fdm7'
// Axios.delete(`http://localhost:3001/api/delete/application/${fdmId}`).then((response) => {
//   console.log(response)
// });

// let fdmId = 'fdm7'
// Axios.get(`http://localhost:3001/api/get/applicants`).then((response) => {
//   console.log(response)
// });

// Axios.put('http://localhost:3001/api/update/mentee/mentor-id', {
//   mentorId: "fdm2",
//   fdmEmail: "fdm0007@fdm.co.uk"
// }).then((response) => {
//   console.log(response)
// });