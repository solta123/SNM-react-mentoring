import './App.css';
import ErrorBoundary from './common/ErrorBoundrary/ErrorBoundary';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';
import { withStore } from './store/withStoreHoc';

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
