import React from "react";
import IconBookMark from "../assets/icons/script_bookmark.svg";
import IconStar from "../assets/icons/script_star.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { scriptInfoRouter } from "../config/routeConfig";

const Script = (props) => {
    const navigate = useNavigate();
    const nextPage = (e) => {
        e.preventDefault();

        axios.post(scriptInfoRouter, {
            script:props.title,
            user_id:JSON.parse(sessionStorage.getItem("simulife-user"))._id,
        })
        .then((resp) => {
            // console.log(resp.data);
            sessionStorage.setItem("script-details", JSON.stringify(resp.data));
            navigate("/script-description");
        })
        .catch((e) => {
            alert(e);
        })
    }



    return (
        <div className="script">
            <div className="script-img-section">
                <div className="script-background-container">
                    <img src={props.bg} alt="script background" className="script-background"></img>
                </div>
                
                <img src={IconBookMark} alt="bookmark icon" className="script-bookmark"></img>
                <div className="script-type">
                    <img src={props.profile} alt="person profile" className="script-profile"></img>
                    <div className="script-username">{props.role}</div>
                </div>
            </div>
            <div className="script-name">{props.scriptName}</div>
            <div className="script-info">
                <img src={IconStar} alt="icon star" className="script-star"/>
                {props.keys}
                {/* <div className="script-time">
                    <img src={IconClock} alt="icon clock" className="script-clock"></img>
                    <div>{props.time}</div>
                </div>
                <div className="script-rating">
                    <img src={IconStar} alt="icon star" className="script-star"></img>
                    <div>{props.rating}</div>
                </div> */}
            </div>
            <button className="script-button" onClick={nextPage}>Try Now</button>
        </div>
    );
};

export default Script;