import React from 'react'
import CommentEntry from './CommentEntry'

export default function CommentsList({posts}) {
    return (
        <div className="comments-list">
            {
                posts.map((comment, i) => { 
                    return <CommentEntry commentData={comment} key={i} />
                })
            }
        </div>
    )
}