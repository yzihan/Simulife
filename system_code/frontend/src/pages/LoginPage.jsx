// MyComponent.js
import React, { useState } from 'react';
import "../assets/css/login.css";
import LoginLeft from "../assets/imgs/login-left.png";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';


function LoginPage({goMain}) {
    const [showLogin, setShowLogin] = useState(true);
    const changeForm = () =>{
        setShowLogin(!showLogin);
    };

  return (
    <div className='login'>

        <div className='left-login'>
            <div className='left-login-img-container'>
                <img src={LoginLeft} alt="login left" className='left-login-img'/>
            </div>
        </div> 
        

        <div className='right-login'>
            <div> 
                <div className='heading'>{showLogin ? "Sign in" : "Sign up"}</div>
                <div className='content'>Get started by entering your details</div>
                {showLogin ? <LoginForm changeForm={changeForm} goMain={goMain}></LoginForm> : <SignupForm changeForm={changeForm} goMain={goMain}></SignupForm>}
                 

            </div>
        </div>   
        
    </div>
  );
}

export default LoginPage;