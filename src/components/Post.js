import React from "react"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { selectPost } from '../actions/actions'
import { connect } from 'react-redux'

function Post({postData, handleClick}) {
    return(
        
        <div className="post-entry">
            <div className="post-content">
                <a target="_blank" href={postData.url}>{postData.title}</a>
                <br/>
                <Link to="/comments" 
                    onClick={() => handleClick(parseUrl(postData.permalink))} 
                    className="btn btn-outline-primary">
                    Comments
                </Link>
            </div>
            <div className="post-img">
                {postData.thumbnail_width ? <img src={postData.thumbnail} alt="Thumbnail"/> : ""}
            </div>
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
    handleClick: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Post)