import React from "react";

const Message = (props) => {

    
    return (
        <div className={`message message-me-${props.fromMe}`}>
            <div className="message-body">
                <div className="message-content">
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    );
};


export default Message;