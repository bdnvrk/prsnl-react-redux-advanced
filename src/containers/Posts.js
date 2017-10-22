import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Post from '../components/Post'

function Posts({posts}) {
    return (
      <div>
        {
            posts.map((post, i) => { 
                return <Post postData={post} key={i} />
            })
        }
      </div>
    )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts