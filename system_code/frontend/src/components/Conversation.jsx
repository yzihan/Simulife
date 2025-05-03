import React, { useEffect, useState, useRef } from 'react';
import Message from "./Message";
import axios from 'axios';
import getImgURL, { conversationRouter } from '../config/routeConfig';
import SwitchComponent from './SwitchComponent';
import SenderIcon from "../assets/icons/icon_message_send.svg";
import TextField from '@mui/material/TextField';

const Conversation = (props) => {
  const [input, setInput] = useState('');
  const handleChange = (event) => {
    setInput(event.target.value); 
  };


  const [conversationPrompt, setConversationPrompt] = useState([
    {role:"system", content:props.chatBackground },
    {role:"assistant", content:props.firstSentence},
  ]);
  const [msgs, setMsgs] = useState([
    {fromMe:false, content:props.firstSentence},
  ]);

  // scroll to bottom
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  



  const sendToGPT = () => {
    axios.post(conversationRouter, {
      scriptplay_id:sessionStorage.getItem("scriptplay_id"),
      order:props.order,
      script_name:sessionStorage.getItem("script"),
      prompt:conversationPrompt,
    })
    .then((resp) => {
      setMsgs([...msgs, {fromMe:false, content:resp.data.resp, time:resp.data.time}])
      setConversationPrompt([...conversationPrompt, {role:"assistant", content:resp.data.resp}])
    })
    .catch((error) => {
      console.log(error);
    })

  }

  // user send chat information
  const chat = (e) => {
    e.preventDefault();
    if(!input){
      alert("type something!")
    }else{
      setMsgs([...msgs, {fromMe:true, content:input}])
      setConversationPrompt([...conversationPrompt, {role:"user", content:input}])
      setInput("")
    }
  }

  // send message to gpt when prompt is updated by user
  useEffect( () => {
    if(conversationPrompt[conversationPrompt.length - 1].role === "user"){
      sendToGPT();
    }
  }, [conversationPrompt])


  // stop conversation
  const stopConversation = (e) => {
    e.preventDefault();
    props.continueConversation(conversationPrompt, props.characterName);
  }

  return (
    <div className='conversation'>
      <SwitchComponent onClick={props.toggleShowLeftInfo} left="Stories" right="Character Info"></SwitchComponent>
      <div className='conversation-header'>
        <img src={getImgURL(props.avatar)} alt="a sample profile" className='conversation-profile'></img>
        <div>
          <div className="conversation-character-name">{props.characterName}</div>
        </div>
        
      </div>

      <div className='messages'>
          {msgs.map( (item, i) => {
            return (
              <div className={`messgae-box messgae-box-${item.fromMe ? "right":"left"}`}  key={i} >
                <Message fromMe={item.fromMe} content={item.content} time={item.time}></Message>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
      </div>

      <div className="chat-container">
        <div className="chat-container-top">
            <form className='conversation-input'>
                
                <TextField
                    className='conversation-input-content'
                    id="filled-textarea"
                    placeholder="Type in"
                    multiline
                    variant="standard"
                    style={{width:'100%', color: "#fff"}}
                    value={input} 
                    onChange={handleChange}
                    />
                <button type='submit' onClick={chat} className="chat-message-input">
                    <img src={SenderIcon} alt="icon for sending message"></img>
                </button>
            </form>
        </div>
        <button className='conversation-stop-btn' onClick={stopConversation}>Stop Conversation</button>
      </div>
    </div>
  );

}

export default Conversation;