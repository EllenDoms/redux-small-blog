import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form'; //assign to alias FormReducer
import PostsReducer from './reducerPost';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: FormReducer
});

export default rootReducer;
