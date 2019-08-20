import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';

import { FormHelperText } from '@material-ui/core';
import { loginUser } from '../../actions/authActions';
import { colors, fontFamily } from '../../utils/config';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: colors['axa-red'],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: colors.secondary,
    color: 'white',
    '&:hover': {
      backgroundColor: colors['secondary-light'],
    },
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontFamily: fontFamily.errorText,
  },
  title: {
    fontFamily: fontFamily.title,
  },
  label: {
    fontFamily: fontFamily.text,
  },
});


class Login extends Component {
  state = {
    login: '',
    password: '',
    loginError: false,
    passwordError: false,
  };


  from = this.props.location.state || { from: { pathname: '/admin' } };

  inputsValidation = () => {
    const { login, password } = this.state;
    let valid = true;
    if (login === undefined || login === '') {
      this.setState({
        loginError: true,
      });
      valid = false;
    } else {
      this.setState({
        loginError: false,
      });
    }

    if (password === undefined || password === '') {
      this.setState({
        passwordError: true,
      });
      valid = false;
    } else {
      this.setState({
        passwordError: false,
      });
    }
    return valid;
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(this.from.from.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(this.from.from.pathname);
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = () => {
    if (this.inputsValidation()) {
      const userData = {
        login: this.state.login,
        password: this.state.password,
      };

      this.props.loginUser(userData);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    const { classes, auth } = this.props;
    const { loginError, passwordError } = this.state;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            <FormattedMessage id="login.title" />
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth error={loginError}>
              <InputLabel className={classes.label}><FormattedMessage id="login.login" /></InputLabel>
              <Input id="login" name="login" autoComplete="login" autoFocus onChange={this.handleChange} onKeyPress={this.keyPress} />
              {loginError ? (
                <FormHelperText >
                  <FormattedMessage
                    id={'suggestion.stepperContent.requiredLabel'}
                  />
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl margin="normal" required fullWidth error={passwordError}>
              <InputLabel htmlFor="password" className={classes.label}><FormattedMessage id="login.password" /></InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} onKeyPress={this.keyPress} />
              {passwordError ? (
                <FormHelperText >
                  <FormattedMessage
                    id={'suggestion.stepperContent.requiredLabel'}
                  />
                </FormHelperText>
              ) : null}
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              <FormattedMessage id="login.submit" />
            </Button>
          </form>
          {(auth.status.loginHasFailed && auth.status.status === 404) ? (
            <Typography className={classes.errorText}>
              <FormattedMessage
                id={'login.error'}
              />
            </Typography>
          ) : null}
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
