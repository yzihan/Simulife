// MyComponent.js
import React from 'react';
import "../assets/css/header.css";
import IconHome from "../assets/icons/header_home.svg";
import IconSage from "../assets/icons/Icon_sage.svg";
import { useNavigate } from 'react-router-dom';
import IconLogout from "../assets/icons/Icon_logout.svg";


function Header() {
  const navigate = useNavigate();
  const goHomePage = () => {
      // navigate("/info");
      navigate("/");
      sessionStorage.removeItem("scriptplay-info");
  }

  const goSagePage = () => {
    navigate("/sage-selection");
}

  const logout = () => {
    sessionStorage.removeItem("scriptplay-info");
    sessionStorage.removeItem("simulife-user");
    sessionStorage.removeItem("scriptplay-detail");
    navigate("/welcome");
  }

  // Your component code here
  return (
    <div className='header'>
      <div></div>
      {/* <img src={IconHeader} alt="icon brid" className='icon-bird'></img> */}
      <div className='header-table'>
        <div onClick={goHomePage} className='header-table-items'>
          <img src={IconHome} alt="icon home" className='icon-home table-icons'></img>
          <div className='table-text'>Home</div>
        </div>

        <div onClick={goSagePage} className='header-table-items'>
          <img src={IconSage} alt="icon sage" className='icon-sage table-icons'></img>
          <div className='table-text'>Sages</div>
        </div>
        
      </div>

      <button className="log-out" onClick={logout}><img src={IconLogout} alt="icon logout"></img></button>
    </div>
  );
}

export default Header;
