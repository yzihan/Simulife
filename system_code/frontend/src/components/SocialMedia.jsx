import React, { useEffect, useState } from 'react';
import Post from './Post';
import getImgURL from '../config/routeConfig';



function SocialMedia(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts([...props.socialMedia.posts]);
        console.log(props.socialMedia.smBG)
    }, [])


    return (
        <div className='social-media'>
            <div className='social-media-heading'>Social Media</div>


            <div className='social-media-body'>
                <div className='social-media-profile'>
                    <div className='social-media-profile-top'>
                        <div className='social-media-profile-bg-block img-box'>
                            <img src={getImgURL(props.socialMedia.smBG)} alt='a sample background image of socal media' className='box-img'></img>
                        </div>

                        <div className='social-media-profile-avatar img-box'>
                            <img src={getImgURL(props.socialMedia.avatar)} alt="a sample avatar" className='box-img'></img>
                        </div>

                        <div className='social-media-profile-name'>
                                {props.socialMedia.characterName}
                        </div>
                    </div>

                    <div className='social-media-profile-info'>
                        <div className='social-media-profile-info-1'>
                        </div>

                        <div className='social-media-profile-info-2'>
                            <div className='social-media-profile-info-title'>
                                Relationship:
                            </div>
                            <div className='social-media-profile-relationship'>
                                {props.socialMedia.relationship}
                            </div>
                        </div>

                        <div className='social-media-profile-info-3'>
                            <div className='social-media-profile-info-title'>
                                Description:
                            </div>
                            <div className='social-media-profile-description'>
                                {props.socialMedia.characterDescription}
                            </div>
                        </div>
                    </div>
                </div>

               {posts.map((item, i) => {
                    return <Post key={i} characterName={props.socialMedia.characterName} postContent={item.post} image={item.image}></Post> 
               })} 
            </div>
            
            {/* type in to get more post, no used for now */}
            {/* <div className='social-media-bottom'>
                <form className='social-media-input'>
                    <input type="text" placeholder='Type in' className='social-media-input-content'></input>
                    <button type='submit' onClick={props.chat} className="social-media-message-input">
                        <img src={SenderIcon} alt="icon for sending sessage"></img>
                    </button>
                </form>
            </div>             */}
        </div>
    );
}

export default SocialMedia;