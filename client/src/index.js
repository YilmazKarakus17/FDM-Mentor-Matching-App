import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line
import TechnicianLogin from './login/TechnicianLogin'
import StandardLogin from './login/StandardLogin'
import MentorSignUp from './signup-page/MentorSignUp'

import SearchMentor from './mentee-page/SearchMentor'
import MentorPage from './mentor-page/MentorPage'
ReactDOM.render(
    <SearchMentor fdmEmail="fdm0003@fdm.co.uk" />,
  document.getElementById('root')
);

