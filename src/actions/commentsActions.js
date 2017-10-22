import fetch from 'isomorphic-fetch'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const INVALIDATE_COMMENTS = 'INVALIDATE_COMMENTS'


export function invalidateComments(url) {
  return {
    type: INVALIDATE_COMMENTS,
    url
  }
}

function requestComments(url) {
  return {
    type: REQUEST_COMMENTS,
    url
  }
}

function receiveComments(url, json) {
  return {
    type: RECEIVE_COMMENTS,
    url,
    comments: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


function fetchComments(url) {
  return dispatch => {
    dispatch(requestComments(url))
    console.log(url);
    return fetch(`https://www.reddit.com/${url}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(url, json)))
  }
}


function shouldFetchComments(state, url) {
  const comments = state.currentComments
  if (!comments) {
    return true
  } else if (comments.isFetching) {
    return false
  } else {
    return comments.didInvalidate
  }
}

export function fetchCommentsIfNeeded(url) {
  return (dispatch, getState) => {
    if (shouldFetchComments(getState(), url)) {
      return dispatch(fetchComments(url))
    }
  }
}