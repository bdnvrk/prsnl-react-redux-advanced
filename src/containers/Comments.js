import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    fetchCommentsIfNeeded,
    invalidateComments,
} from '../actions/commentsActions'
import CommentsList from '../components/CommentsList';


class Comments extends Component {
    constructor(props) {
        super(props)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
      }
    
      componentDidMount() {
        const { dispatch, url} = this.props
        dispatch(fetchCommentsIfNeeded(url))
      }

      handleRefreshClick(e) {
        e.preventDefault()
    
        const { dispatch, url } = this.props
        dispatch(invalidateComments(url))
        dispatch(fetchCommentsIfNeeded(url))
      }
    
      render() {
        const {posts, isFetching, lastUpdated } = this.props
        return (
          <div>
            <h1>Comments</h1>
            <p>
                <Link to="/">Go back</Link> 
                {' '}
                {
                    !isFetching && <a href="#" onClick={this.handleRefreshClick}>Refresh</a>
                }
            </p>
            {isFetching && posts.length === 0 && <h2>Loading...</h2>}
            {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
            {posts.length > 0 &&
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <CommentsList posts={posts}/>
              </div>}
          </div>
        )
      }
}


function mapStateToProps(state) {
  const { commentSection } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = commentSection['comments'] || {
    isFetching: true,
    items: []
  }

  return {
    url: state.commentsTarget.commentsUrl,
    posts,
    isFetching,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(Comments)
