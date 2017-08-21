import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Landing from './Landing';

const FourOhFour = () => <div>404...</div>;

const Main = () =>
  <main>
    <div className="container">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </main>;

export default Main;
