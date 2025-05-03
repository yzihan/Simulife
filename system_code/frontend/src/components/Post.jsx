import React, { useState } from 'react';
import IconLikeTrue from "../assets/icons/icon_like_true.svg";
import IconLikeFalse from "../assets/icons/icon_like_false.svg";
import getImgURL from '../config/routeConfig';

function Post(props) {
    const [isLike, setIsLike] = useState(false);

    const toggleLike = (e) => {
        e.preventDefault();
        setIsLike(!isLike);
    }


    
    return (
    <div className='social-media-post'>
        <div className='social-media-img-block img-box'>
            <img src={getImgURL(props.image)} alt="a post image" className='box-img'></img>
        </div>

        <div className='post-body'>
            <img src={isLike ? IconLikeTrue : IconLikeFalse} className='post-like-icon' alt="icon for like the post" onClick={toggleLike}/>
            <div className='post-heading'>{props.characterName}</div>
            <div className='post-content'>{props.postContent}</div>
        </div>
    </div>
    );
}

export default Post;