import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { withStyles } from '@material-ui/core/styles';

import { IntlProvider, addLocaleData } from 'react-intl';
import localeEnglish from 'react-intl/locale-data/en';
import localeJapanese from 'react-intl/locale-data/ja';
import store from './store';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Admin from './components/admin/Admin';
import SuggestionPost from './components/suggestionPost/SuggestionPost';
import Login from './components/auth/Login';
import PrivateRoute from './components/elements/PrivateRoute';
import NotFound from './components/layout/NotFound';
import SuggestionList from './components/suggestionList/SuggestionList';
import Suggestion from './components/suggestion/Suggestion';

import englishTranslation from './translations/en.json';
import japaneseTranslation from './translations/ja.json';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

addLocaleData([...localeEnglish, ...localeJapanese]);

const translations = {
  en: englishTranslation,
  ja: japaneseTranslation,
};

const userLanguage = (navigator.language || navigator.userLanguage).includes(
  'ja',
)
  ? 'ja'
  : 'en';

const styles = (theme) => ({
  root: {
  },
  toolbar: {
    flexGrow: 1,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: '100%',
  },
});

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  state = {
    language: userLanguage,
    translations: translations[userLanguage],
  };

  changeLanguage = () => {
    if (this.state.language === 'en') {
      this.setState({ language: 'ja' });
      this.setState({ translations: japaneseTranslation });
    } else {
      this.setState({ language: 'en' });
      this.setState({ translations: englishTranslation });
    }
  };

  render() {
    const { classes } = this.props;

    // Check for token expiration
    if (localStorage.jwtToken) {
      const decoded = jwtDecode(localStorage.jwtToken);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/';
      }
    }

    return (
      <IntlProvider
        locale={this.state.language}
        messages={this.state.translations}
        key={this.state.language}
      >
        <Provider store={store}>
          <Router>
            <div className={classes.root}>
              <div className={classes.toolbar}>
                <Header changeLanguage={this.changeLanguage} />
              </div>
              <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/newsuggestion" component={SuggestionPost} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/admin" component={Admin} />
                  <PrivateRoute exact path="/suggestionlist" component={SuggestionList} />
                  <PrivateRoute exact path="/suggestion/:id" component={Suggestion} />
                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}

export default withStyles(styles)(App);
