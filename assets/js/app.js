/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Les imports importants
import React, { useState, useContext } from 'react';
import ReactDOM from "react-dom";
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import CustomerPage from './pages/CustomerPage';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

// console.log('Hello Webpack Encore!!! Edit me in assets/js/app.js');

AuthAPI.setup();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(NavBar);

    return (
    <AuthContext.Provider 
        value={{
            isAuthenticated,
            setIsAuthenticated
        }}
    >   
        <HashRouter>
            <NavbarWithRouter />

            <main className="container pt-5">
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/invoices" component={InvoicesPage} />
                    <PrivateRoute path="/customers/:id" component={CustomerPage} />
                    <PrivateRoute path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    </AuthContext.Provider> 
    );
        
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);