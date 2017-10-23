import React from 'react'
import CommentChild from './CommentChild'
export default function CommentEntry({commentData}) {
    return (
        <div>
            <p className="comment-author">
                <span>by&nbsp;</span>
                {commentData.author}
            </p>
            <p>{commentData.body}</p>
            {
                commentData.replies.data ? commentData.replies.data.children.map((reply, i ) => {
                    return <CommentChild replyContent={reply.data} key={i} /> 
                }) : console.log("empty")
            }
        </div>
    );
}