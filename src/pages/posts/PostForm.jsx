import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { createPost, getPost, updatePost } from '../../redux/actions/postsActions';

const PostForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const { id } = useParams();

  const { post, loading } = useSelector((state) => state.posts);
  //   const { values } = useSelector((state) => state.form.postForm);

  useEffect(() => {
    if (post) {
      dispatch(change('postForm', 'title', post.title));
      dispatch(change('postForm', 'body', post.body));
    }
  }, [post]);

  useEffect(() => {
    if (id && id > 0) {
      dispatch(getPost(id));
    }
  }, [id]);

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="text-danger">{error}</div>;
    }
  };
  const renderField = ({ input, label, meta }) => {
    const className = `form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`;
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input id={input.name} {...input} className={className} />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    let dataToSend = {};
    if (id && id > 0) {
      dataToSend = {
        ...post,
        title: formValues.title,
        body: formValues.body,
      };
      dispatch(updatePost(dataToSend));
      console.log(dispatch(updatePost(dataToSend)), 'dispatch(updatePost(dataToSend))');
    } else {
      const id = Math.round(Math.random() * 1000 - 22);
      dataToSend = {
        id,
        ...formValues,
      };

      dispatch(createPost(dataToSend));
    }
    if (!loading) replace('/');
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row text-center">
          <div className="col md-4">
            <h1>{id ? 'Update Feed' : 'Create Feed'}</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field name="title" label="Title" component={renderField} />
              <Field name="body" label="Body" component={renderField} />
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Required';
  }
  if (!formValues.body) {
    errors.body = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'postForm',
  validate,
})(PostForm);
