import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

import { getPosts } from '../../redux/actions/postsActions';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const [allPosts, setAllPosts] = useState([...posts]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirtsPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    const currentPosts = posts.slice(indexOfFirtsPost, indexOfLastPost);
    setAllPosts([...currentPosts]);
  }, [posts, currentPage]);

  const Paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPosts = () => {
    if (allPosts.length) {
      return allPosts.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} body={post.body} />
      ));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container listContainer mt-5">{renderPosts()}</div>
      <div className="row m-0 mt-3">
        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
          <Pagination
            paginate={Paginate}
            totalPost={posts.length}
            postPerPage={postsPerPage}
            currentPage={currentPage}
            jumpToPage
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Posts;
