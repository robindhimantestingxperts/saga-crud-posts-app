import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { Auth0Provider } from '@auth0/auth0-react';

//redux store
import store from './redux/store';

//components imports
import PrivateRoute from './components/PrivateRoute';
import Posts from './pages/posts/Posts';
import PostDetail from './pages/posts/PostDetail';
import PostForm from './pages/posts/PostForm';
import Profile from './pages/proflle/Profile';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;

const App = () => {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <Router>
          <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/:id" component={PostDetail} />
              <PrivateRoute path="/create" component={PostForm} />
              <PrivateRoute exact path="/update/:id" component={PostForm} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Auth0Provider>
        </Router>
        <NotificationContainer />
      </Provider>
    </div>
  );
};

export default App;
