import React from "react";
import Icon from "../assets/icons/Icon_info.svg";

const StoryEvent = ({eventType, content}) => {
    return (
        <div className={`storyevent ${eventType}`}>
            {/* if story-description */}
            {eventType === "story-description" &&
                <>
                    <img src={Icon} alt="sample icon" className="story-description-icon"></img>
                    <div className="story-description">
                        {content}
                    </div>
                </>
            }


        </div>
    );
};

export default StoryEvent;