import React, {useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import "../assets/css/thoughts.css";
import axios from "axios";
import { imgRouter } from "../config/routeConfig";
import IconLoading from "../assets/icons/Loading.svg";

const ThoughtsPage = () => {
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


    const [thought, setThought] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleThoughtAreaChange = (event) => {
        setThought(event.target.value);
    };
  
    // temporaly disable it

    const generateImg = (e) => {
        e.preventDefault();
        // check null        
        if(!thought){
            alert("Type something to generate image!");
            return;
        }
        
        setIsLoading(true);
        axios.post(imgRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            prompt:thought,
            n:5,
            size:"256x256",
        })
        .then((resp) => {
            navigate("/");
            // let imgList = [];
            // imgList.push(resp.data[0]);
            // for(let i=0; i<5; i++){
            //     imgList.push(resp.data[i]);
            // }
            // navigate("/thoughts-imgs", {state:imgList});
            // setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
            alert(e.request.responseText);
            setIsLoading(false);
        })
    }

    const returnHome = (e) => {
        e.preventDefault();
        navigate("/");
        sessionStorage.removeItem("scriptplay-info");
    }

    
    return (
        <div className="main">
            <div className="thoughts-page">
                <div className="thoughts-page-heading">Add your thoughts！</div>

                <div className="thoughts-page-body">
                    <div className="thoughts-page-panel">
                        <div className="thoughts-page-title">Your Thoughts:</div>
                        <form className="thoughts-page-form" onSubmit={generateImg}>
                            <textarea 
                                placeholder="Type your thoughts here..." 
                                className="thoughts-page-content" 
                                name="thoughts"
                                onChange={handleThoughtAreaChange}
                            ></textarea>
                            {/* <button className="thoughts-page-generate" type="submit">Generate Images</button> */}
                            <button className="thoughts-page-generate" type="submit">Submit</button>
                        </form>
                    </div>
                </div>   

                
                <div className="thoughts-page-buttons">
                    <button className="thoughts-page-return" onClick={returnHome}>Return to Home</button>
                </div>             
            </div>

            {/* loading */}
            <div className={`loading-container isloading-${isLoading}`}>
                <img className="loading" src={IconLoading} alt="loading icon"></img>
            </div>
            <div className={`loading-background isloading-${isLoading}`}></div>
        </div>
    );
};

export default ThoughtsPage;