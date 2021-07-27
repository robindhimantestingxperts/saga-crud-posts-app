import { call, takeEvery, put, takeLatest, delay } from 'redux-saga/effects';
import { GET_POSTS, GET_POST, DELETE_POST, CREATE_POST, UPDATE_POST } from '../actions/types';

import API from '../../services/posts.services';
import {
  setPosts,
  setPost,
  pushPost,
  pushUpdatedPost,
  removeDeletedPost,
  setNotification,
  removeNotification,
} from '../actions/postsActions';

// function* resetNotification() {
//   debugger;
//   yield put(removeNotification());
// }

// const reset = resetNotification();

function* fetchPosts() {
  try {
    const result = yield call(API, { method: 'get' });
    if (result) {
      yield put(setPosts(result.data));
      yield put(
        setNotification({
          status: 'success',
          message: 'Successfully fetched Posts.',
        })
      );
      // yield setTimeout(() => {
      //   reset.next();
      // }, 1000);
      yield delay(500);
      yield put(removeNotification());
    }
  } catch (e) {
    yield put(
      setNotification({
        status: 'error',
        message: 'Failed to fetch.',
      })
    );
  }
}

export function* fetchPostsAsync() {
  yield takeEvery(GET_POSTS, fetchPosts);
}

function* fetchPost(action) {
  try {
    const result = yield call(API, { method: 'get', id: action.payload });
    if (result) {
      yield put(setPost(result.data));
      // yield put(
      //   setNotification({
      //     status: 'success',
      //     message: 'Successfully fetched Post.',
      //   })
      // );
    }
  } catch (e) {
    yield put(
      setNotification({
        status: 'error',
        message: 'Failed to Fetch.',
      })
    );
  }
}

export function* fetchPostAsync() {
  yield takeEvery(GET_POST, fetchPost);
}

function* createPost(action) {
  try {
    const result = yield call(API, { method: 'post', body: JSON.stringify(action.payload) });
    if (result) {
      yield put(pushPost(result.data));
      yield put(
        setNotification({
          status: 'success',
          message: 'Successfully Created Post.',
        })
      );
      yield delay(500);
      yield put(removeNotification());
    }
  } catch (e) {
    yield put(
      setNotification({
        status: 'error',
        message: 'Failed to create Post.',
      })
    );
  }
}

export function* createPostAsync() {
  yield takeEvery(CREATE_POST, createPost);
}

function* updatePost(action) {
  try {
    const result = yield call(API, {
      method: 'put',
      id: action.payload.id,
      body: JSON.stringify(action.payload),
    });
    if (result) {
      yield put(pushUpdatedPost(result.data));
      yield put(
        setNotification({
          status: 'success',
          message: 'Successfully Update Post.',
        })
      );
      yield delay(500);
      yield put(removeNotification());
    }
  } catch (e) {
    yield put(
      setNotification({
        status: 'error',
        message: 'Failed to update Post.',
      })
    );
  }
}

export function* updatePostAsync() {
  yield takeEvery(UPDATE_POST, updatePost);
}

function* deletePost(action) {
  try {
    const res = yield call(API, { method: 'delete', id: action.payload });
    if (res) {
      yield put(removeDeletedPost(action.payload));
      yield put(
        setNotification({
          status: 'success',
          message: 'Successfully Deleted Post.',
        })
      );
      yield delay(500);
      yield put(removeNotification());
    }
  } catch (e) {
    yield put(
      setNotification({
        status: 'error',
        message: 'Failed to delete Post.',
      })
    );
  }
}

export function* deletePostAsync() {
  yield takeLatest(DELETE_POST, deletePost);
}
