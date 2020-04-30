import React from 'react';
import numeral from 'numeral';

import CommentListItem from './comment_list_item';
import avatarImg from '../img/avatar_48.png';
import Spinner from './Spinner/Spinner';



const CommentList = (props) => {

    const comments = props.commentsArray.map((comment) => (
        <CommentListItem key={comment.etag} comment={comment} />
    ))

    if(props.commentsArray.length === 0) {
        //return <div></div>
        return <Spinner />
    }

    return (
        <div className="comments-container">
            <div className="comments-header">
                <div className="comments-header-top">
                    <div className="comments-count">
                        <span>{numeral(props.commentCount).format('0,0')} Comments</span>
                    </div>
                    <div className="comments-sort">
                        <svg viewBox="0 0 24 24">
                            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
                            <path d="M0 0h24v24H0z"></path>
                        </svg>
                        <span>SORT BY</span>
                    </div>
                </div>
                <div className="comments-header-botton">
                    <div className="comments-header-botton-avatar">
                        <img alt="" src={avatarImg} />
                    </div>
                    <div className="comments-header-botton-placeholder">
                        <span>Add a public comment...</span> 
                    </div>
                </div>
            </div>
            <div className="comments-body">
                <ul>
                    {comments}
                </ul>	
            </div>
        </div>
    );

}

export default CommentList;