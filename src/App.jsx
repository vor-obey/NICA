import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const SignUp = lazy(() => import('./routes/SignUp'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Laoding...</h1>}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} permissions={['admin']} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
