import React from 'react';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundrary/ErrorBoundary';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import { withStore } from './components/store/withStoreHoc';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/search*", "/film/:id"]} component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default withStore(App);
