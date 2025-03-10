import React, { useEffect, useState } from "react";
import Script from "../components/Script";
import "../assets/css/script.css";
import History from "../components/History";
import { useNavigate} from 'react-router-dom';
import { scripts, getBackground } from "../config/scriptinfo";
import { formatTime, timeDiff } from "../utils/util";
import axios from "axios";
import { userAllscriptPlayRouter } from "../config/routeConfig";
import { defaultSage, sageList } from "../config/SageConfig";


const ScriptPage = () => {
    const navigate = useNavigate();
    const [histories, setHistories] = useState([]); 
    // check if logined
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!sessionStorage.getItem("simulife-user")){
                navigate("/welcome");
            }else{
                const user_id = JSON.parse(sessionStorage.getItem("simulife-user"))._id;
                getAllScriptPlay(user_id);
            }
            
            if(!localStorage.getItem("sage-info")){
                localStorage.setItem("sage-info", JSON.stringify(defaultSage));
            }
            
        };
        asyncUseEffect();
    }, []);

    const getAllScriptPlay = (user_id) => {
        axios.post(userAllscriptPlayRouter, {
          user_id:user_id
        })
        .then((resp) => {
            setHistories(resp.data);
            console.log(resp.data)
        })
        .catch((e) => {
          alert(e.request.responseText)
        })

    }




    return (
        <div className='main'>
            <div className="homepage">
                <div className="sp-top">
                    <h2>Discover Stories</h2>
                    <div className="scripts">
                        {scripts.map((item, i) => {
                            return <Script key={i} title={item.title}  scriptName={item.script_name}  keys={item.keys} role={item.role} profile={item.profile} bg={item.bg}></Script>;
                        })}
                    </div>
                </div>

                <div className="sp-bottom">
                    <h2>My History</h2>
                    <div className="histories">
                        {histories.map((item, i) => {
                            return <History key={i} _id={item._id} title={item.script_name} script={item.script} bg={getBackground(item.script)} time={formatTime(item.start_time)} len={timeDiff(item.start_time, item.end_time)} pages={`${item.pages} Pages`}></History>;
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScriptPage;