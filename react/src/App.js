import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPrivateRoute from './AdminPrivateRoute';
import PublicRoute from './PublicRoute';
import ProductDetail from './components/frontend/collections/ProductDetail';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="Admin" />
          
          {/* Define route for Product Detail */}
          <Route path="/product/:category/:product" component={ProductDetail} />
          
          <PublicRoute path="/" name="Home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
