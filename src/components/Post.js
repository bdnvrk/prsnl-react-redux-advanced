import React from "react"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { selectPost } from '../actions/actions'
import { connect } from 'react-redux'

function Post({postData, handleClick, subreddit}) {
    return(
        
        <div className="post-entry">
            <a target="_blank" href={postData.url}>{postData.title}</a>
            {postData.thumbnail_width ? <img src={postData.thumbnail} alt="Thumbnail"/> : ""}
            <Link to="/comments" 
                onClick={() => handleClick(parseUrl(postData.permalink))} 
                className="comments-btn">
                Comments
            </Link>
        </div>
    );
}

function parseUrl(url) {
    return url.substring(0, url.length - 1);
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleClick: (url) => {
        dispatch(selectPost(url))
      }
    }
  }

Post.propTypes = {
    postData: PropTypes.object.isRequired, 
}

export default connect(null, mapDispatchToProps)(Post)