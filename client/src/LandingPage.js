import React from "react";
import PadlockIcon from './Icons/padlock.png'
import ApplicationIcon from './Icons/application.png'
import SignUpIcon from './Icons/signup.png'
import './LandingPage.css'

export default class LandingPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="landing-page">
                <button className="landing-page-buttons">
                    <h5>Mentor Application</h5>
                    <img className="button-icons" src={ApplicationIcon}/>
                </button>
                <button className="landing-page-buttons">
                    <h5>Login</h5>
                    <img className="button-icons" src={PadlockIcon}/>
                </button>
                <button className="landing-page-buttons"> 
                    <h5>Mentee Signup</h5>
                    <img className="button-icons" src={SignUpIcon}/>
                </button>
            </div>
        )
    }
}