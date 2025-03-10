import React from "react";
import IconBookMark from "../assets/icons/script_bookmark.svg";
import { scriptPlayDetailsRouter } from "../config/routeConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = (props) => {
    const navigate = useNavigate({});

    const seeDetails = () => {
        axios.post(scriptPlayDetailsRouter,{
            _id:props._id
        })
        .then((resp) => {
            console.log(resp.data);
            sessionStorage.setItem("scriptplay-detail", JSON.stringify(resp.data));
            navigate("/history");
        })
        .catch((error) => {
            console.log(error);
        })
    }



    return (
        <div className="history" onClick={seeDetails}>
            <div className="history-img">
                <img src={props.bg} alt="history background" className="history-background"></img>
            </div>

            <div className="history-info">
                <img src={IconBookMark} alt="icon bookmark" className="history-bookmark"></img>
                <div className="history-scriptname">{props.title}</div>
                <div className="history-page">{props.pages}</div>
                <div className="history-gamingtime">{props.len}</div>
                <div className="history-date">{props.time}</div>
            </div>
        </div>
    );
};

export default History;