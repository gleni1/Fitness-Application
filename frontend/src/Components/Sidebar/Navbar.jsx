import React, { useState } from 'react';
import './styles/Navbar.css';
import Footer from './Footer';
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom';

import trufitLogo from '../icons/logo-full.png'
import workoutIcon from '../icons/dumbbell.png'
import coachIcon from '../icons/coach.png'
import mycoachIcon from '../icons/mycoach.png'
import clientsIcon from '../icons/clients.png'
import clientWorkout from '../icons/clientworkout.png'
import chatlogo from '../icons/chat.png'

function Navbar({ onLoginClick, onSignupClick, userRole }) {

  const [activeLink, setActiveLink] = useState(null);

  const toggleLink = (linkId) => {
    setActiveLink(linkId === activeLink ? null : linkId);
  };


  return (
    <div className="navBar">
      <div className="links">
        <Link id='navlogo' className={activeLink === 'navlogo' ? 'active' : ''} onClick={() => toggleLink('navlogo')} to='./' >
          <img 
              src={trufitLogo} 
              style={{ 
                width:"115px" ,marginLeft: "30px"
                }}
          />
        </Link>
        <Link id='link1' to='/Workouts' className={activeLink === 'link1' ? 'active' : ''} onClick={() => toggleLink('link1')} >
          <img 
            src={workoutIcon} 
            style={{ 
              width:"20px", 
              display:"inline-block", 
              marginRight: "12px"
            }} 
          />
          Exercises
        </Link>
        <Link id='link2' to='/Coaches' className={activeLink === 'link2' ? 'active' : ''} onClick={() => toggleLink('link2')}>
          <img 
            src={coachIcon} 
            style={{width:"20px", 
            display:"inline-block", 
            marginRight: "12px"}} 
          />
          Coaches
        </Link>
      </div>
      <Footer onLoginClick={onLoginClick} onSignupClick={onSignupClick} userRole={userRole}/>
    </div>
  );
}

export default Navbar;


