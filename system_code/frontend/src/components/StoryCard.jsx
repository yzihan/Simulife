import React from "react";
import getImgURL from "../config/routeConfig";

const StoryCard = (props) => {

    return (
        <div className="story-card">
  
                <div className="card-page">{`Page ${props.id}`}</div>
                {/* {isLike ? <img src={IconLikeBlue} alt="icon like button" className="card-like" onClick={changeLike}></img> : <img src={IconLike} alt="icon like button" className="card-like" onClick={changeLike}></img>} */}
               

                <div className="card-img-block">
                    <img src={getImgURL(props.image)} alt="sample img" className="card-img"></img>
                </div>
                <div className="card-story">
                    <span>
                        {props.story}   
                    </span>
                </div>
           
            
        </div>
    );
};

export default StoryCard;