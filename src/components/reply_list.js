import React from 'react';
import ReplytListItem from './reply_list_item';

const ReplytList = (props) => {

    const comments = props.replies.map((comment) => (
        <ReplytListItem key={comment.etag} comment={comment} />
    ))

    return (
        <div className="comments-body">
            <ul>
                {comments}
            </ul>	
        </div>
        
    );
}

export default ReplytList;