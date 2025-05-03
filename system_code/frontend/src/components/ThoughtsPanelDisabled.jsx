import React from "react";

const ThoughtsPanelDisabled = (props) => { 
    const generateImg = (e) => {
        e.preventDefault();
    }


    return (
        <div className="thoughts-panel-disabled">
            <div className="thoughts-panel-header">Your thoughts:</div>
            <form className="thoughts-panel-form" onSubmit={generateImg}>
                <textarea className="thoughts-panel-content" placeholder="Your thoughts..." value={props.thoughts} ></textarea>
            </form>
        </div>
    );

}

export default ThoughtsPanelDisabled;