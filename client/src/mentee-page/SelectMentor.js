//Importing React and React based modules
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { ClickAwayListener } from '@material-ui/core';
//Importing Axios for communicating with the server
import Axios from 'axios';
import './SelectMentor.css';

export default class SelectMentor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menteeFdmEmail: this.props.menteeFdmEmail,
            fdmId: this.props.fdmId,
            matchPercentage: this.props.matchPercentage,
            mentorDetails: {},
            collapse: true,
            isOpen: false,
            hi: 'hi',
        };
        this.toggleCollapse = this.toggleCollapse.bind(this)
        console.log(this.state.matchPercentage)
      }
      toggleCollapse(){
        this.setState({
          collapse: !this.state.collapse,
          isOpen: !this.state.isOpen
        })
      }


    componentWillMount(){
        Axios.get(`http://localhost:3001/api/get/mentor/${this.state.fdmId}`).then((response) => {
                console.log(response)
                this.setState({
                    mentorDetails: response.data[0]
                })
        });
    }

    render(){
        const {collapse} = this.state;
        const handleClick = () => {};
        let mentorName = this.state.mentorDetails.firstname + " " +this.state.mentorDetails.lastname;
        let matchPercentage = Math.round(this.state.matchPercentage*100) + "%";
        let container;
        let handleClickAway = () => {};
        if (this.state.isOpen) {
            container =                 
                <button onClick={this.toggleCollapse}>
                    <span className="openText">{mentorName}</span>
                    <div className={this.state.isOpen ? "plus clicked": "plus"}>    </div>
                </button>;
                handleClickAway = () => {this.setState({collapse: !this.state.collapse,isOpen: !this.state.isOpen})};
        } else {
            container =                 
                <button onClick={this.toggleCollapse}>
                    <span className="openText">{mentorName}</span>
                    <div className={this.state.isOpen ? "plus clicked": "plus"}></div>
                </button>;
        }
        return (
          <div class="select-mentor-container">
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}>
                <div className="w-300">
                    {container}
                    <div className="wrap">
                        <CSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={310}
                            transitionLeaveTimeout={310}>
                            {collapse ? null : <div className="content" tabIndex="0" onClick={handleClick}>
                                <div className="container">
                                    <p>Match Percentage: {matchPercentage}</p>
                                    <p>{this.state.mentorDetails.description}</p>
                                    <p><a href={"mailto:"+this.state.mentorDetails.email}>{this.state.mentorDetails.email}</a></p>
                                    <button className="accept" /*onClick={}*/ >Select Mentor</button >
                                </div>
                            </div>}
                        </CSSTransitionGroup>
                    </div>            
                </div>
            </ClickAwayListener>
          </div>
        );
    }
}