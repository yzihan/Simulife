import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/endingpage.css";
import IconLeft from "../assets/icons/icon_left.svg";
import IconRight from "../assets/icons/icon_right.svg";
import Carousel from "../components/HistoryCarousel";
// import "../assets/css/history.css";
import getImgURL from "../config/routeConfig";




const HistoryPage = () => {
    const navigate = useNavigate();
    const [playDetails, setPlayDetails] = useState([]);

    // check if logined and choose script
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!sessionStorage.getItem("simulife-user")){
                navigate("/welcome");
            }
            if(!sessionStorage.getItem("scriptplay-detail")){
                navigate("/");
            }

            setPlayDetails(JSON.parse(sessionStorage.getItem("scriptplay-detail")).playdata);
        };
        asyncUseEffect();
    }, [navigate])

    const returnToHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

    // carousel
    const [carouselIndex, setCarouselIndex] = useState(0);
    const pre = () => {
        if(carouselIndex === 0) return ;
        setCarouselIndex( carouselIndex - 1 );
    }
    const next = () => {
        if(carouselIndex === playDetails.length-1) return ;
        setCarouselIndex( carouselIndex + 1 );
    }

    const renderStory = () => {
        for(let i=0; i<playDetails.length; i++){
            if(i === carouselIndex){
                return <Carousel key={i} img={getImgURL(playDetails[i].img)} description={playDetails[i].story} alt="scriptplay image" page={i + 1}></Carousel>
            }
        }
    }

    return (
        <div className="main">
            <div className="story-ending">
                <div className="story-ending-heading">History</div>

                <div className="story-ending-body">
                    <div className="story-ending-card">
                        { renderStory()}

                        <div className="story-ending-icon-left story-ending-icon">
                            <img src={IconLeft} alt="icon to go left" onClick={pre}></img>
                        </div>
                        <div className="story-ending-icon-right story-ending-icon">
                            <img src={IconRight} alt="icon to go right" onClick={next}></img>
                        </div>
                    </div>                    
                </div>

                <div className="story-ending-buttons">
                    <button className="story-ending-btn" onClick={returnToHome}>Return to home</button>
                </div>

            </div>
        </div>
    );
};

export default HistoryPage;