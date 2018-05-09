import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
  switch(action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state, }; // ...state is take all posts we have had
      // newState[post.id] = post;
      // return newState;
      return { ...state, [action.payload.data.id]: action.payload.data }; // ...take all posts, [take this value] : set equal to this value
    case FETCH_POSTS:
      // console.log(action.payload.data); // [post 1, post 2]
      //{ 4: post }
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
