import React from "react";
import PadlockIcon from './Icons/padlock.png'
import ApplicationIcon from './Icons/application.png'
import SignUpIcon from './Icons/signup.png'
import './LandingPage.css'

export default class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            standardLoginRedirect: this.props.standardLoginRedirect,
            technicianLoginRedirect: this.props.technicianLoginRedirect,
            mentorApplicationRedirect: this.props.mentorApplicationRedirect,
            menteeSignUpRedirect: this.props.menteeSignUpRedirect
        }
    }

    render(){
        return(
            <div className="landing-page">
                <div className="row p-1"></div>
                <button className="landing-page-buttons" onClick={() => this.state.mentorApplicationRedirect()}>
                    <h5>Mentor Application</h5>
                    <img className="button-icons" src={ApplicationIcon} alt="Mentor Application Button Icon"/>
                </button>
                <button className="landing-page-buttons" onClick={() => this.state.standardLoginRedirect()}>
                    <h5>Sign In</h5>
                    <img className="button-icons" src={PadlockIcon} alt="Sign In Button Icon"/>
                </button>
                <button className="landing-page-buttons" onClick={() => this.state.menteeSignUpRedirect()}> 
                    <h5>Mentee Signup</h5>
                    <img className="button-icons" src={SignUpIcon} alt="Mentee Signup Button Icon"/>
                </button>
                <div className="row p-1"></div>
                <button id="technician-login" onClick={() => this.state.technicianLoginRedirect()}>
                    Technician Sign In
                </button>
            </div>
        )
    }
}