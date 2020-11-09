import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const HomeScreen = lazy(() => import('./screens/Home'));
const AuthScreen = lazy(() => import('./screens/Auth'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Laoding...</h1>}>
        <Switch>
          <PrivateRoute exact path="/" component={HomeScreen} permissions={['admin']} />
          <Route path={['/login', '/signup']} component={AuthScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
