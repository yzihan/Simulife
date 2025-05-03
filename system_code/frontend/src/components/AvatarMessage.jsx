import React from 'react';

function AvatarMessage(props) {
    return (
        <div className={`avatar-message avatar-message-me-${props.fromMe}`}>
            {!props.fromMe  &&
            <div className='avatar-profile-container'>
                <div className='avatar-profile img-box'>
                    <img src={props.profileImg} className='box-img'></img>
                </div>
            </div>
             
            }

            <div className='avatar-message-body'>
                {
                    !props.fromMe &&
                    <div className='avatar-name'>
                    {props.characterName}
                    </div>
                }
                <div className='avatar-content'>
                {props.content}
                </div>
            </div>
        </div>
    );
}

export default AvatarMessage;