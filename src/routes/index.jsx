import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Novo from '../pages/Cadastro';
import Register from '../pages/Register';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" exact component={Register} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/new" component={Novo} isPrivate />

    <Route component={SignIn} />
  </Switch>
);

export default Routes;
