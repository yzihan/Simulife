// MyComponent.js
import React from 'react';
import "../assets/css/welcome.css";
import UserLogo from "../assets/icons/Icon_profile.png";
import WelcomeLogo from "../assets/icons/welcome-logo.png";
import { useNavigate } from 'react-router-dom';


function Welcome() {
  // Your component code here
  const navigate = useNavigate();
  const goLogin = (e) => navigate("/login");


  return (
    <div className='welcome'>
        <div className='left_welcome'>
            <div> 
                {/* <div className='profile'>
                    <img src={UserLogo} alt="user logo" />
                    <span>Simulife</span>
                </div> */}
                <div className='welcome-heading'>The Grand Drama of Life</div>
                <div className='welcome-content'>It is said that life is like a dream, with its ephemeral moments that flicker like stars in the night sky. Each day is a new chapter, and every choice we make contributes to the unfolding narrative of our lives.</div>
                <div className='welcome-btn-block'>
                  <button className='welcome_button' onClick={goLogin}>Start Simulating</button>
                </div>
            </div>
            
        </div>
        <div className='right_welcome'>
        <img src={WelcomeLogo} alt="welcome logo" className='welcome_logo'/>
        </div>
    </div>
  );
}

export default Welcome;
