import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCommentsIfNeeded,
    invalidateComments,
} from '../actions/commentsActions'


class Comments extends Component {
    constructor(props) {
        super(props)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
      }
    
      componentDidMount() {
        const { dispatch, url} = this.props
        dispatch(fetchCommentsIfNeeded(url))
      }
    
      /**componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = this.props
          dispatch(fetchCommentsIfNeeded(selectedSubreddit))
        }
      }**/
    
    
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

            <p>
              {lastUpdated &&
                <span>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  {' '}
                </span>}
              {!isFetching &&
                <a href="#" onClick={this.handleRefreshClick}>
                  Refresh
                </a>}
            </p>
            {isFetching && posts.length === 0 && <h2>Loading...</h2>}
            {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
            {posts.length > 0 &&
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                {posts}
              </div>}
          </div>
        )
      }
}


function mapStateToProps(state) {
  const { commentsTarget, commentSection} = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = commentSection[commentsTarget] || {
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
