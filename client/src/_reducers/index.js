// 여러가지 Reducer (user, post, comment, ... 등)를 합친다.
import { combineReducers } from 'redux';
import user from './user_reducer';
// import comment from './comment_reducer';

const rootReducer = combineReducers({
    user
    // comment
})

export default rootReducer;