import React from "react";
import getImgURL from "../config/routeConfig";

const Character = (props) => {
    return (
        <div className="character">
            <div className="character-img-block img-box">
                <img src={getImgURL(props.img)} alt="sample profile" className="character-img box-img"></img>
            </div>
            
            <div className="character-right">
                <div className="character-name">{props.characterName}</div>
                <div className="character-description">{props.characterDescriptin}</div>
            </div>
    
        </div>
    );
};

export default Character;