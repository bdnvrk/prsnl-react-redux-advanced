import {
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    INVALIDATE_COMMENTS
} from '../actions/commentsActions'
  
function comments(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
    },
    action
    ) {
    switch (action.type) {
        case INVALIDATE_COMMENTS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
        return state
    }
}

export function commentSection(state = {}, action) {
switch (action.type) {
    case INVALIDATE_COMMENTS:
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
    return Object.assign({}, state, {
        comments: comments(state[action.commentsTarget], action)
    })
    default:
    return state
}
}
  
  