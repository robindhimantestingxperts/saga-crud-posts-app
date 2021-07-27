import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { getPost, deletePost } from '../../redux/actions/postsActions';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const { post, loading } = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const handleDeleteClick = () => {
    dispatch(deletePost(id));
    replace('/');
  };

  if (loading) {
    return <h1 className="text-muted">Please wait fetching your data...</h1>;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="card mt-4">
          <div className="card-body">
            <div className="card-title">{post.title}</div>
            <p className="card-text">{post.body}</p>
            <Link to={`/update/${id}`}>
              <i className="fa fa-edit"></i>
            </Link>
            <i
              className="fa fa-trash ml-2 text-danger"
              style={{ cursor: 'pointer' }}
              onClick={handleDeleteClick}
            ></i>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PostDetail;
