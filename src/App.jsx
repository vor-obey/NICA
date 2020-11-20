import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const Auth = lazy(() => import('./layouts/Auth'));
const Dashboard = lazy(() => import('./layouts/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Laoding...</h1>}>
        <Switch>
          <Route path={['/login', '/signup', '/forgotpass']} component={Auth} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
