import React from 'react'


export default function CommentChild({ replyContent }) {
    return (
        <div>
            <p className="comment-author">
                <span>by&nbsp;</span>
                {replyContent.author}
            </p>
            <p>{replyContent.body}</p>
        </div>
    );
}