import {
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  PUSH_CREATED_POST,
  SET_POST,
  SET_POSTS,
  UPDATE_POST,
  PUSH_UPDATED_POST,
  DELETE_ASYNC_POST,
  CREATE_POST,
  NOTIFICATION,
  RESET_NOTIFICATION,
} from '../actions/types';
const initialState = {
  loading: false,
  posts: [],
  post: {},
  notification: {
    status: '',
    message: '',
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        loading: true,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        loading: true,
      };
    case PUSH_CREATED_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        loading: true,
      };
    case PUSH_UPDATED_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        }),
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ASYNC_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case RESET_NOTIFICATION:
      return {
        ...state,
        notification: {
          status: '',
          message: '',
        },
      };
    default:
      return state;
  }
};

export default postReducer;
