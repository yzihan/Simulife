import React from "react";

const Carousel = (props) => {


    return (
        <div className="carousel">
            <div className="story-ending-description">{props.description}</div>
            <div className="story-ending-img">
                <img src={props.img} alt={props.alt}></img>
                {props.page ? <div className="story-ending-page">{`Page ${props.page}`}</div> : ""}
            </div>
         
        </div>

    );
};

export default Carousel;