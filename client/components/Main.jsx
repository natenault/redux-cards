import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Landing from './Landing';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Signout from './auth/Signout';

const FourOhFour = () => <div>404...</div>;

const Main = () =>
  <main>
    <div className="container">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </main>;

export default Main;
