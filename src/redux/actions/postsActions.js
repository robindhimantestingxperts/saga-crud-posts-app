import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  PUSH_CREATED_POST,
  PUSH_UPDATED_POST,
  SET_POST,
  SET_POSTS,
  UPDATE_POST,
  DELETE_ASYNC_POST,
  NOTIFICATION,
  RESET_NOTIFICATION,
} from './types';

export const getPosts = () => {
  return { type: GET_POSTS };
};

export const setPosts = (result) => {
  return {
    type: SET_POSTS,
    payload: result,
  };
};
export const getPost = (id) => {
  return { type: GET_POST, payload: id };
};

export const setPost = (result) => {
  return {
    type: SET_POST,
    payload: result,
  };
};

export const createPost = (data) => {
  return {
    type: CREATE_POST,
    payload: data,
  };
};

export const pushPost = (result) => {
  return {
    type: PUSH_CREATED_POST,
    payload: result,
  };
};

export const updatePost = (data) => {
  return {
    type: UPDATE_POST,
    payload: data,
  };
};

export const pushUpdatedPost = (result) => {
  if (result) {
    return {
      type: PUSH_UPDATED_POST,
      payload: result,
    };
  }
};

export const deletePost = (id) => {
  return { type: DELETE_POST, payload: id };
};

export const removeDeletedPost = (id) => {
  return { type: DELETE_ASYNC_POST, payload: id };
};

export const setNotification = (payload) => {
  return { type: NOTIFICATION, payload };
};

export const removeNotification = () => {
  return { type: RESET_NOTIFICATION };
};
