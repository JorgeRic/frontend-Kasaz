import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Search from './components/Search'
import AuthProvider from './context/AuthContext.js'
import AnonRoute from './components/AnonRoute'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import Update from './pages/Update'
import List from './pages/List';
import Details from './pages/Details'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Create from './pages/Create'
import Private from './pages/Private';
import NotFound from './pages/NotFound'
import firebase from "firebase";
 
const config = {
  apiKey: "AIzaSyCYpHiA65Eis2pTbr9mPREUT_-qPJl5DbY",
  authDomain: "kasaz-f2313.firebaseapp.com",
  storageBucket: "gs://kasaz-f2313.appspot.com"
};
firebase.initializeApp(config);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path = '/houses' exact component = {List} />  
              <Route path = '/houses/search' exact component = {Search} />
              <Route path = '/houses/details/:id' exact component={Details} />
              <PrivateRoute  path="/private" exact component={Private} />
              <PrivateRoute  path="/houses/update/:id" component={Update} />
              <PrivateRoute  path="/houses/create" component={Create} />
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

