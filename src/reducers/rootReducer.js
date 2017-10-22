import { combineReducers } from 'redux'
import {
    postsBySubreddit,
    selectedSubreddit,
    commentsTarget,
} from './feedReducers'

import { commentSection } from './commentsReducers'



const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    commentsTarget,
    commentSection
})
  
export default rootReducer