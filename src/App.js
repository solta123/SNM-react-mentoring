import './App.css';
import ErrorBoundary from './common/ErrorBoundrary/ErrorBoundary';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route component={Home} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
