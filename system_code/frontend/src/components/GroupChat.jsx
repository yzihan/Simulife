import React, { useEffect, useState, useRef } from 'react';
import AvatarMessage from "./AvatarMessage";
import SwitchComponent from './SwitchComponent';
import axios from 'axios';
import "../assets/css/groupchat.css";
import getImgURL, { groupChatRouter } from '../config/routeConfig';
import { getCharacterInfoByName } from '../utils/util';

import SenderIcon from "../assets/icons/icon_message_send.svg";
import TextField from '@mui/material/TextField';

function GroupChat(props) {
    const [input, setInput] = useState('');
    const handleChange = (event) => {
      setInput(event.target.value); 
    };


    const [msgs, setMsgs] = useState([
        {speaker:props.firstSpeaker, content:props.firstSentence},
      ]);

    // user send chat information
    const chat = (e) => {
        e.preventDefault();
        if(!input){
            alert("type something!")
        }else{
            // add user input to prompt and page
            setMsgs([...msgs, {"speaker":props.userName, content:input}])
            setInput("")
        }
    }

    const sendToGPT = () => {
        console.log({
            script:props.script,
            chat_background:props.chatBackground,
            character_list:props.characterList,
            messages:msgs,
            username:props.userName,
          })
        axios.post(groupChatRouter, {
            script:sessionStorage.getItem("script"),
            chat_background:props.chatBackground,
            character_list:props.characterList,
            messages:msgs,
            username:props.userName,
          })
          .then((resp) => {
            // console.log(resp.data.conversations)
            // setMsgs(resp.data.conversations)

            const newMsgs = [...msgs];
            for(let i=0; i<resp.data.conversations.length; i++){
                newMsgs.push({speaker:resp.data.conversations[i].speaker, content:resp.data.conversations[i].content})
            }
            setMsgs(newMsgs);
          })
          .catch((error) => {
            console.log(error);
          })
    }

    useEffect(() => {
        if(msgs[msgs.length - 1].speaker === props.userName){
            sendToGPT();
        }
    }, [msgs])


    // stop conversation
    const stopConversation = (e) => {
        e.preventDefault();
        props.continueGroupChat(msgs, props.userName);
    }

    // scroll to bottom
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);

    return (
    <div className='groupchat'>
        <SwitchComponent onClick={props.toggleShowLeftInfo} left="Stories" right="Characters Info"></SwitchComponent>
        <div className='groupchat-header'>
            {props.characterList.map((item, i) => {
                return (
                    <div className='groupchat-person' key={i}>
                        <img src={getImgURL(item.avatar)} alt="a sample profile" className='groupchat-profile'></img>
                        <div>
                            <div className="groupchat-character-name">{item.character_name}</div>
                        </div>
                    </div>
                );
            })}
        </div>
  
        <div className='messages'>
            {msgs.map( (item, i) => {
              return (
                <div className={`avatar-message-box avatar-message-box-${item.speaker === props.userName ? "right":"left"}`}  ref={scrollRef} key={i} >
                  <AvatarMessage fromMe={item.speaker === props.userName} 
                    profileImg={getImgURL(getCharacterInfoByName(props.characterList, item.speaker))} 
                    characterName={item.speaker} 
                    content={item.content}></AvatarMessage>
                </div>
              );
            })}
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

export default GroupChat;