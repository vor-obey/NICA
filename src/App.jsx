import React, {
  lazy, Suspense, useState, useEffect,
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RoleContext from './roleContext';
import { permissions } from './configs/app';

const Auth = lazy(() => import('./layouts/Auth'));
const Dashboard = lazy(() => import('./layouts/Dashboard'));

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') ?? permissions.roles.SUPER_ADMIN);
  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);
  return (
    <RoleContext.Provider value={{
      role,
      setRole,
    }}
    >
      <Router>
        <Suspense fallback={<h1>Laoding...</h1>}>
          <Switch>
            <Route path={['/login', '/signup', '/forgotpass']} component={Auth} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </RoleContext.Provider>
  );
}

export default App;
