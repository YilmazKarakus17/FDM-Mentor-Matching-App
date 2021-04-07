import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line
import TechnicianLogin from './login/TechnicianLogin'
import StandardLogin from './login/StandardLogin'
import MentorSignUp from './signup-page/MentorSignUp'

import SearchMentor from './mentee-page/SearchMentor'

ReactDOM.render(
    <SearchMentor />,
  document.getElementById('root')
);

