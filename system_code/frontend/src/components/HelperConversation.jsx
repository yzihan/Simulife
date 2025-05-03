import React, { useRef, useState, useEffect } from 'react';
import "../assets/css/helperconversation.css";
import axios from "axios";
import { widgetHelperRouter } from '../config/routeConfig';
import SenderIcon from "../assets/icons/icon_message_send.svg";

function HelperConversation(props) {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const sendMessageWidget = (messages) => {
        axios.post(widgetHelperRouter, {
            messages:messages,
        })
        .then((resp) => {
            setMessages([...messages, {role:"assistant", content:resp.data}]);
        })
        .catch((error) => {
            alert("Oops, please try again!");
            console.log(error);
        }) 
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const newMessages = [...messages, {role:"user", content:msg}];
        sendMessageWidget(newMessages);
        setMsg("");
    }

    const handleMsgChange = (e) => {
        setMsg(e.target.value);
    }



      // scroll to bottom
      const messagesEndRef = useRef();
      useEffect(() => {
          // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
  


    return (
        <div className="helper-conversation">
            <div className='helper-conversation-header'>
                Agent Selection Helper
            </div>
    
            <div className='helper-conversation-body'>
 

                {messages.map((item, i) => {
                    return (
                        <div className={`helper-conversation-message-box helper-conversation-message-me-${item.role === "user"}`} key={i}>
                            <div>
                                {item.content}
                            </div>
                        </div>

                        );
                    })}
                        
                    <div ref={messagesEndRef} />
            </div>

            <form className='helper-conversation-bottom' onSubmit={sendMessage}>
                <input className='helper-conversation-message-input' placeholder='Type your message' type='text' onChange={handleMsgChange} value={msg}></input>
                <button type='submit' className="helper-conversation-btn">
                        <img src={SenderIcon} alt="icon for sending message"></img>
                </button>
            </form>
        </div>
    );
}

export default HelperConversation;