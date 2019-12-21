import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Bar from './components/Bar'
import Search from './components/Search'
import AuthProvider from './context/AuthContext.js'
import AnonRoute from './components/AnonRoute'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import List from './pages/List';
import Details from './pages/Details'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Create from './pages/Create'
import Private from './pages/Private';
import NotFound from './pages/NotFound'
// import Update from './pages/Update'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
            <Header />
            <Bar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path = '/houses' exact component = {List} />
              <Route path = '/houses/create' exact component = {Create} />
              <Route path = '/houses/search' exact component = {Search} />
              <Route path = '/houses/details/:id' exact component={Details} />
              <PrivateRoute  path="/houses/private" exact component={Private} />
             
              <Route path= '/signup' component={Signup} />
              <AnonRoute path="/login" exact component={Login} />
              <Route component = {NotFound}/>
            </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

