import React, { Component } from 'react';
import Login from './components/Login';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import {  BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {

  logOut(){
    localStorage.removeItem("x-access-token");
  }

  render() {
    const auth = isAuthenticated();
    return(
      <Router>
        <div>
          <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">Shopping Cart</Link>
              <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">Products</Link>
                  <Link className="nav-item nav-link" to="/cart">Cart</Link>
                  { (auth) ? <Link className="nav-item nav-link" to="/checkout">
                    Checkout</Link>: ''}
                  { (auth) ?
                    ( <a className="nav-item nav-link" href="/"
                      onClick={this.logOut}>Log out</a>) :
                    ( <Link className="nav-item nav-link float-right"
                      to="/login">Log in</Link>)}
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <br/>
            <Route exact path="/" component={Products} /> 
            { /* Route enable choose component to render,
              to enable use react-router-dom, need to wrap app component in BroserRouter component */}
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            { (!auth) ? <Route exact path="/login" component={Login} /> : ''}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
