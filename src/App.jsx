import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Auth/Login'));
const SignUp = lazy(() => import('./screens/Auth/SignUp'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Laoding...</h1>}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/signup" component={SignUp} permissions={[]} />
          <Route path="/login" component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
