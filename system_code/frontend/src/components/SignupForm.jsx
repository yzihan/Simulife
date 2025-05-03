import React, { useState } from "react";
import axios from "axios";
import { signUpRouter } from "../config/routeConfig";
import { useNavigate } from "react-router-dom";
import TransitionsModal from "./TransitionsModal";
import { terms, privacy } from "../config/privacy";

const SignupForm = ({changeForm}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });

      const [isChecked, setIsChecked] = useState(false);

      // Handler for checkbox change
      const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isChecked){
            alert("Agree to terms and policy to continue.")
            return ;
          }

        // console.log(formData.email);
        // console.log(formData.password)


        axios.post(signUpRouter, {
            email : formData.email,
            password:formData.password,
        })
        .then((resp) =>{
                sessionStorage.setItem("simulife-user", JSON.stringify(resp.data));
                navigate("/");
            })
        .catch((e) => {
            console.log(e);
            alert(e.response.data)
        });

      };



    return (
        <>
            <form onSubmit={handleSubmit} className='login-form'  id="signup-form">

                    <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                    />
                    </div>

                    <div>
                    <label htmlFor="password">Create a passcode</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div>
                    <label htmlFor="confirmPassword">Confirm your passcode</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div>
                        <input type="checkbox" className='checkbox-form' onChange={handleCheckboxChange}></input>
                        <label>By signing up, you agree to our <TransitionsModal title='Terms' content={terms} className="terms-privacy"></TransitionsModal> and <TransitionsModal title="Privacy Policy" content={privacy} className="terms-privacy"></TransitionsModal>.</label>
                    </div>

                    <div className="submit-button-block">
                        <button className='submit-button' type="submit">Sign up</button>
                    </div>
                   
                </form>
                <div className='content content-tail'>Already have an account? <button className='switch-login' onClick={ () => changeForm()}>Log in</button></div>
            </>
    );
}

export default SignupForm;