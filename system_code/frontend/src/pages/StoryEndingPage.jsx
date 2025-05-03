import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/endingpage.css";
import IconLeft from "../assets/icons/icon_left.svg";
import IconRight from "../assets/icons/icon_right.svg";
import Carousel from "../components/HistoryCarousel";
import { shantaramEnding,harryPotterEnding, witcherEnding, threeBodyEnding, enduranceEnding, miracleOnTheHudsonEnding } from "../config/endings";



const StoryEndingPage = (props) => {
    const navigate = useNavigate();
    // check if logined and choose script
    const [scriptInfo, setScriptInfo] = useState();
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
    

    // const readOriginalStory = (e) => {
    //     e.preventDefault();
    // }

    const writeYourThoughts = (e) => {
        e.preventDefault();
        navigate("/thoughts")
    }
    
    const returnToHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

    // carousel
    const [carouselIndex, setCarouselIndex] = useState(0);
    const pre = () => {
        const n = shantaramEnding.length;
        setCarouselIndex(  (carouselIndex - 1 + n )%n );
    }
    const next = () => {
        const n = shantaramEnding.length;
        setCarouselIndex(  (carouselIndex + 1)%n );
    }
    const getCarousel = () => {
        let endings;
        if(!scriptInfo){
            return ;
        }else if(scriptInfo.script === "HarryPotter"){
            endings = harryPotterEnding;
        }else if(scriptInfo.script === "Shantaram"){
            endings = shantaramEnding;
        }else if(scriptInfo.script === "Witcher"){
            endings = witcherEnding;
        }else if(scriptInfo.script === "ThreeBody"){
            endings = threeBodyEnding;
        }else if(scriptInfo.script === "Endurance"){
            endings = enduranceEnding;
        }else if(scriptInfo.script === "TheHudson"){
            endings = miracleOnTheHudsonEnding;
        }else if(scriptInfo.script === "FreedomQuest"){
            endings = miracleOnTheHudsonEnding;
        
        }else{
            return;
        }

        for(let i=0; i<endings.length; i++){
            if(i === carouselIndex){
                return <Carousel key={i} img={endings[i].img} description={endings[i].description} alt={endings[i].alt}></Carousel>
            }
        }
    }


    return (
        <div className="main">
            <div className="story-ending">
                <div className="story-ending-heading">Congratations on Your Journey！</div>

                <div className="story-ending-body">
                    <div className="story-ending-card">
                        { getCarousel()}

                        <div className="story-ending-icon-left story-ending-icon">
                            <img src={IconLeft} alt="icon to go left" onClick={pre}></img>
                        </div>
                        <div className="story-ending-icon-right story-ending-icon">
                            <img src={IconRight} alt="icon to go right" onClick={next}></img>
                        </div>
                    </div>                    
                </div>

                <div className="story-ending-buttons">
                        {/* <button className="story-ending-btn" onClick={readOriginalStory}>Read origional story</button> */}
                        <button className="story-ending-btn" onClick={writeYourThoughts}>Write your thoughts</button>
                        <button className="story-ending-btn" onClick={returnToHome}>Return to home</button>
                    </div>

            </div>
        </div>
    );
};

export default StoryEndingPage;