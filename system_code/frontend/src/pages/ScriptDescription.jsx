import React, { useEffect, useState } from "react";
import "../assets/css/scriptdescription.css";
import { useNavigate } from "react-router-dom";
import Character from "../components/Character";
import axios from "axios";
import getImgURL, { newScriptPlayRouter } from "../config/routeConfig";



const ScriptDescription = () => {
    const navigate = useNavigate();
    const [scriptInfo, setScriptInfo] = useState({});
    const [characters, setCharacters] = useState([]);
    const [sageStyle, setSageStyle] = useState("");
    const [mode, setMode] = useState("");
    // check if logined and choose script
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!sessionStorage.getItem("simulife-user")){
                navigate("/welcome");
            }
            if(!sessionStorage.getItem("script-details")){
                navigate("/");
            }  
            const data = JSON.parse(sessionStorage.getItem("script-details"));
            setScriptInfo(data);
            setCharacters(data.characters);
        };
        asyncUseEffect();
    }, [navigate])

    const startScriptPlay = (e) => {
        if(!sageStyle || !mode){
            alert("Please select sage mode and style to start!")
            return;
        }

        e.preventDefault();
        axios.post(newScriptPlayRouter, {
            script:scriptInfo.script,
            // mode:mode,
            mode:"hybrid-agent",
            user_id:JSON.parse(sessionStorage.getItem("simulife-user"))._id,
            agent:JSON.parse(localStorage.getItem("sage-info")).sageFullName,
        })
        .then((resp) => {
            // console.log(resp.data);
            console.log(mode);
            console.log(sageStyle)
            sessionStorage.setItem("sage-mode", mode);
            sessionStorage.setItem("sage-style", sageStyle)
            sessionStorage.setItem("scriptplay-info", JSON.stringify(resp.data));
            navigate("/story");
        })
        .catch((e) => {
            alert(e);
        })
    }

    const goBack = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const renderCharacters = () => {
        return (
            characters.map( (item, i) => {
                return <Character key={i} characterName={item.name} characterDescriptin={item.description} img={item.url}></Character>
            }) 
        );
    }

    return (
        <div className="main">
            <div className="script-description-page">
                <div className="sd-left">
                    <div className="sd-background-block">
                        {scriptInfo && <img src={getImgURL(scriptInfo.first_image)} alt="a sample bg" className="sd-background"></img>}
                        <div className="sd-script">{scriptInfo.script_name}</div>
                    </div>
                    
                    <div className="sd-person">
                        <div>
                            <div className="sd-profile-block img-box">
                                {scriptInfo && <img src={getImgURL(scriptInfo.author_profile)} alt="sample profile" className="sd-profile box-img"></img>}
                            </div>
                            <div className="sd-subtitle">{scriptInfo.subtitle}</div>
                        </div>
                    </div>
            

                    <div className="sd-description">
                        <div className="sd-description-title">Story Background</div>
                        <div className="sd-description-content">{scriptInfo.story_description}</div>
                    </div>


                    <div className="sd-mode">
                        <div className="sd-mode-1">
                            <div className="sd-select-content">Select Sage Style</div>
                            <select value={sageStyle} onChange={(e) => setSageStyle(e.target.value)}>
                                <option value="">-</option>
                                <option value="No Agent">No Agent</option>
                                <option value="Feedback Agent">Feedback Agent</option>
                                <option value="Reflective Questions Agent">Reflective Questions Agent</option>
                            </select>
                        </div>

                        <div className="sd-mode-2">
                            <div className="sd-select-content">Select Sage Mode</div>
                            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                                <option value="">-</option>
                                <option value="Pre-Action Mode">Pre-Action Mode</option>
                                <option value="Post-Action Mode">Post-Action Mode</option>
                            </select>
                        </div>
                    </div>

                    <div className="sd-buttons">
                        <button className="sd-back-button" onClick={goBack}>Go Back</button>
                        {/* {mode && <button className="sd-next-button" onClick={startScriptPlay}>Start</button>} */}
                        <button className="sd-next-button" onClick={startScriptPlay}>Start</button>
                    </div>

                </div>

                <div className="sd-right">
                    <div className="sd-heading">Introduction of Characters</div>
                    <div className="sd-character-description">
                    Below is a list of potential characters that you may portray or interact with throughout the narrative.
                    </div>

                    <div className="characters no-scrollbar">
                        {renderCharacters()}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ScriptDescription;