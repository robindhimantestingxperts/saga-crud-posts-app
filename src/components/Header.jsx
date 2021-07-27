import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout } = useAuth0();
  const { location } = useHistory();
  const {
    notification: { message, status },
  } = useSelector((state) => state.posts);

  const notificationMessage = useCallback(() => {
    if (message) {
      NotificationManager[status](message);
    }
  }, [message, status]);

  useEffect(() => {
    notificationMessage();
  }, [notificationMessage]);

  const checkRoute = () => {
    if (location.pathname.includes('create') || location.pathname.includes('update')) return false;
    return true;
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-fixed-top ">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <strong>My Posts</strong>
          </Link>
        </div>
        <div className="justify-content-end">
          <ul className="nav d-flex">
            {!isAuthenticated && (
              <li className="nav-item ">
                <span
                  style={{ cursor: 'pointer' }}
                  className="nav-link text-white"
                  onClick={() => loginWithPopup()}
                >
                  Log In
                </span>
              </li>
            )}

            {checkRoute() && isAuthenticated ? (
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  User Profile
                </Link>
              </li>
            ) : null}

            {isAuthenticated && (
              <li className="nav-item">
                <span
                  style={{ cursor: 'pointer' }}
                  className="nav-link text-white"
                  onClick={() => logout()}
                >
                  Log Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
