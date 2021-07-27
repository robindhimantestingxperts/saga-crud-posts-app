import { all } from 'redux-saga/effects';
import {
  fetchPostsAsync,
  fetchPostAsync,
  deletePostAsync,
  createPostAsync,
  updatePostAsync,
} from './postsSaga';

export default function* rootSaga() {
  yield all([
    fetchPostsAsync(),
    fetchPostAsync(),
    deletePostAsync(),
    createPostAsync(),
    updatePostAsync(),
  ]);
}
