import React, { useRef, useState, useEffect } from 'react';
import WidgetMessage from './WidgetMessage';
import IconClose from "../assets/icons/Icon_close.svg";
import "../assets/css/chatwidget.css";
import TextField from '@mui/material/TextField';
import SenderIcon from "../assets/icons/icon_message_send.svg";

function ChatWidget(props) {
    const [showChat, setShowChat] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowChat(!showChat);
    }

      // scroll to bottom
    const messagesEndRef = useRef();
    useEffect(() => {
        // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        
    }, [props.messages]);


    return (
        <div className='chat-widget'>
            <div className='widget'>
                <div className='widget-img-box img-box' onClick={toggleShow}>
                    <img src={props.currentSage.image} className='box-img' alt="a chat widget img"></img>
                </div>
            </div>
        
            <div className={`widget-chat widget-chat-${showChat}`}>
                <div className='widget-chat-header'>
                    <div className='widget-chat-icon-box img-box'>
                        <img src={props.currentSage.image} alt="a chat widget img" className='box-img'></img>
                    </div>
                    <div className='widget-chat-heading'>{props.currentSage.sageName}</div>
                    <button className='widget-close-btn' onClick={toggleShow}>
                        <img src={IconClose} alt="icon for close the widget"></img>
                    </button>
                </div>

                <div className='widget-chat-body'>
                    <div className='widget-chat-top'>
                        <div className='widget-chat-top-box img-box'>
                            <img src={props.currentSage.image} alt="a chat widget img" className='box-img'></img>
                        </div>
                        <div className='widget-chat-agentname'>{props.currentSage.sageName}</div>
                        <div className='widget-chat-message'>I am here to accompany you on this journey!</div>
                    </div>

                    {props.messages.map((item, i) => {
                        return (
                            <div className='widget-message-box' key={i}>
                                <WidgetMessage fromMe={item.role === "user"} profile={props.currentSage.image} content={item.content} ></WidgetMessage>
                            </div>

                        );
                    })}
                    
                    <div ref={messagesEndRef} />
                </div>

                <form className='widget-chat-bottom' onSubmit={props.sendMessage}>
                    <input className='widget-chat-message-input' placeholder='Message...' type='text' onChange={props.handleMsgChange} value={props.msg}></input>
                </form>
            </div>
        </div>
    );
}

export default ChatWidget;