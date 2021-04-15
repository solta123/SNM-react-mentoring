import React from 'react';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundrary/ErrorBoundary';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import { withStore } from './components/store/withStoreHoc';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_hu from "./translations/hu/common.json";
import common_en from "./translations/en/common.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: sessionStorage.getItem('lang') || 'en',
  resources: {
    en: {
      common: common_en
    },
    hu: {
      common: common_hu
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Switch>
            <Route exact path={["/", "/search*", "/film/:id"]} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </I18nextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default withStore(App);
