import React, { useState, useEffect } from "react";
import "../assets/css/thoughtsimg.css";
import ThoughtsPanel from "../components/ThoughtsPanel";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { imgRouter } from "../config/routeConfig";
import IconLoading from "../assets/icons/Loading.svg";

const ThoughtsImgPage = (props) => {
    const navigate = useNavigate();
    const [scriptInfo, setScriptInfo] = useState({});
    
    // check if logined and choose script
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!sessionStorage.getItem("simulife-user")){
                navigate("/welcome");
            }
            if(!sessionStorage.getItem("scriptplay-info")){
                navigate("/");
            }  
            setScriptInfo(JSON.parse(sessionStorage.getItem("scriptplay-info")));

        };
        asyncUseEffect();
    }, [])


    const location = useLocation(); // used to pass props in navigate
    const [isLoading, setIsLoading] = useState(false);
    const [showPanel, setShowPanel] = useState(true);
    const [imgList, setImgList] = useState([...location.state]);
    

    
    const doneThoughts = (e) => {
        e.preventDefault();
        setShowPanel(false);
    } 

    const returnHome = (e) => {
        e.preventDefault();
        navigate("/");
        sessionStorage.removeItem("scriptplay-info")
    }

    const reGenerateImgs = (prompt) => {
        setIsLoading(true);
        axios.post(imgRouter, {
            scriptplay_id: scriptInfo.scriptplay_id,
            prompt:prompt,
            n:5,
            size:"256x256",
        })
        .then((resp) => {
            navigate("/");
            // let newImgList = [];
            // newImgList.push(resp.data[0]);
            // for(let i=0; i<5; i++){
            //     newImgList.push(resp.data[i]);
            // }
            // setImgList(newImgList);
            // setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
            alert(e.request.responseText);
            setIsLoading(false);
        })
    }

    return (
        <div className="main">
            <div className="thoughtimg-page">
                <div className="thoughtimg-page-heading">Add your thoughts!</div>

                <div className="thoughtimg-page-body">
                    {showPanel ? <ThoughtsPanel doneThoughts={doneThoughts} reGenerateImgs={reGenerateImgs}></ThoughtsPanel> : ""}

                    <div className="thoughtimg-page-imgs">
                        {imgList.map((item, i) => {
                            return (
                                <div className="thoughtimg-page-imgbox" key={i}>
                                    <img src={`data:image/png;base64, ${imgList[i]}`} alt="ai generated img" className="thoughtimg-page-img"></img>
                                </div>
                            );
                        })}
                    </div>

                    <button className="thoughtimg-page-return" onClick={returnHome}>Return to Home</button>
                </div>
            </div>

            {/* loading */}
            <div className={`loading-container isloading-${isLoading}`}>
                <img className="loading" src={IconLoading} alt="loading icon"></img>
            </div>
            <div className={`loading-background isloading-${isLoading}`}></div>
        </div>
    );
}

export default ThoughtsImgPage;