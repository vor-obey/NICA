import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Auth = lazy(() => import('./layouts/Auth'));
const Admin = lazy(() => import('./layouts/Admin'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Laoding...</h1>}>
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route path={['/login', '/signup', '/forgotpass']} component={Auth} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
