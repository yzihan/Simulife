import React from "react";
import SenderIcon from "../assets/icons/icon_message_send.svg";
import TextField from '@mui/material/TextField';

const ChatContainer = (props) => {
    return (
        <div className="chat-container">
            <div className="chat-container-top">
                <form className='conversation-input'>
                    {/* <textarea type="text" placeholder='Type in' className='conversation-input-content'></textarea> */}
                    <TextField
                        className='conversation-input-content'
                        id="filled-textarea"
                        placeholder="Type in"
                        multiline
                        variant="standard"
                        style={{width:'100%', color: "#fff", backgroundColor:"inherit", border:"none"}}
                        />
                    <button type='submit' onClick={props.chat} className="chat-message-input">
                        <img src={SenderIcon} alt="icon for sending message"></img>
                    </button>
                </form>
            </div>
            <button className='conversation-stop-btn' onClick={props.stopConversation}>Stop Conversation</button>
        </div>
    );
}


export default ChatContainer;