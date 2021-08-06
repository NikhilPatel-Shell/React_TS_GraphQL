import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import CustomerList from './pages/CustomerList';
import CreateCustomer from './pages/CreateCustomer';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/dashboard" />}
              />
              <Route
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <Route
                exact
                path="/customers/create"
                component={CreateCustomer}
              />
              <Route
                exact
                path="/customers"
                component={CustomerList}
              />
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;