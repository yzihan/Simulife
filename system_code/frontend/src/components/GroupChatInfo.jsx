import React from 'react';
import "../assets/css/groupchat.css";
import getImgURL from '../config/routeConfig';

function GroupChatInfo(props) {
    return (
        <div className='groupchat-info'>
            <div className='groupchat-info-heading'>Characters Description</div>


            <div className='groupchat-info-body'>
               {props.characterList.map((item, i) => {
                    return (
                    <div className='groupchat-info-block' key={i}>
                        <div className='groupchat-info-block-left'>
                            <div className='groupchat-info-block-profile-box img-box'>
                                <img src={getImgURL(item.avatar)} alt="a sample profile" className='box-img'></img>
                            </div>
                        </div>

                        <div className='groupchat-info-block-right'>
                            <div className='groupchat-info-block-name'>{item.character_name}</div>
                            <div className='groupchat-info-block-relationship groupchat-info-block-info'><span>Relationship:</span>{item.relationship}</div>
                            <div className='groupchat-info-block-personality groupchat-info-block-info'><span>Personality:</span>{item.personality}</div>
                            <div className='groupchat-info-block-description groupchat-info-block-info'><span>Description:</span>{item.description}</div>
                        </div>
                    </div>);
               })} 
            </div>
            
        </div>
    );
}

export default GroupChatInfo;