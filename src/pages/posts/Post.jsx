import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { deletePost } from '../../redux/actions/postsActions';

const Post = ({ title, id, body }) => {
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  const renderActions = () => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
          <Link to={`/update/${id}`}>
            <i className="fa fa-edit"></i>
          </Link>
          <i
            className="fa fa-trash ml-2 text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(deletePost(id))}
          ></i>
        </React.Fragment>
      );
    }
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Title</h5>
        <div className="bottomBar" />
        <div className="card-title">{title}</div>
        <h5>Description</h5>
        <div className="bottomBar" />
        <p className="card-text ">{body}</p>
        {renderActions()}
      </div>
    </div>
  );
};

export default Post;
