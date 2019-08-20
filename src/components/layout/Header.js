import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import PowerSettingsNewOutlined from '@material-ui/icons/PowerSettingsNewOutlined';
import ListOutlined from '@material-ui/icons/ListOutlined';
import TableChartOutlined from '@material-ui/icons/TableChartOutlined';
import TranslateOutlined from '@material-ui/icons/TranslateOutlined';
import { ListItemIcon, Divider, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

import { logoutUser } from '../../actions/authActions';
import axaLogo from '../../images/axa-logo-white.png';
import ideaLogo from '../../images/idea-logo-white.png';
import { colors, fontFamily } from '../../utils/config';

const styles = {
  title: {
    flexGrow: 1,
    fontFamily: fontFamily.text,
    fontSize: '19px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    lineHeight: 1.42857,
  },
  image: {
    height: 50,
    width: 50,
    paddingRight: '15px',
  },
  appBar: {
    backgroundColor: colors.primary,
  },
  admin: {
    marginEnd: '10px',
    color: 'white',
    '&:hover': {
      backgroundColor: colors['stepper-step'],
    },
    fontFamily: fontFamily.text,
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    lineHeight: 1.42857,
  },
  menu: {
    marginTop: '30px',
  },
  login: {
    marginEnd: '30px',
    color: 'white',
  },
  userIcon: {
    marginEnd: '30px',
  },
  languageIcon: {
    marginEnd: '10px',
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
    anchorElAdmin: null,
  };

  handleProfileMenuOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleAdminMenuOpen = (e) => {
    this.setState({ anchorElAdmin: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAdminMenuClose = () => {
    this.setState({ anchorElAdmin: null });
  };

  onLogoutClick = () => {
    this.handleMenuClose();
    this.props.logoutUser();
  }

  onChangeLanguage = () => {
    this.props.changeLanguage();
    this.render();
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { anchorEl, anchorElAdmin } = this.state;

    const isMenuOpen = Boolean(anchorEl);
    const isAdminMenuOpen = Boolean(anchorElAdmin);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        className={classes.menu}
        TransitionComponent={Fade}
        elevation={1}
      >
        <MenuItem disabled>
          <ListItemIcon>
            <FaceOutlined />
          </ListItemIcon>
          <Typography >{user.login}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.onLogoutClick}>
          <ListItemIcon>
            <PowerSettingsNewOutlined />
          </ListItemIcon>
          <Typography >
            <FormattedMessage id="header.logout" />
          </Typography>
        </MenuItem>
      </Menu>
    );

    const renderMenuAdmin = (
      <Menu
        anchorEl={anchorElAdmin}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAdminMenuOpen}
        onClose={this.handleAdminMenuClose}
        className={classes.menu}
        TransitionComponent={Fade}
        elevation={1}
      >
        <MenuItem to='/admin' component={Link} onClick={this.handleAdminMenuClose}>
          <ListItemIcon>
            <TableChartOutlined />
          </ListItemIcon>
          <Typography >
            <FormattedMessage id="header.admin.table" />
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem to='/suggestionlist' component={Link} onClick={this.handleAdminMenuClose}>
          <ListItemIcon>
            <ListOutlined />
          </ListItemIcon>
          <Typography >
            <FormattedMessage id="header.admin.list" />
          </Typography>
        </MenuItem>
      </Menu>
    );

    const authLinks = (
      <div>
        <Button className={classes.admin} onClick={this.handleAdminMenuOpen}><FormattedMessage id="header.admin" /></Button>
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
          className={classes.userIcon}
        >
          <AccountCircleOutlined />
        </IconButton>
      </div>
    );

    /* const guestLinks = (
      <Button className={classes.login} to="/login" component={Link}><FormattedMessage id="header.login" /></Button>
    ); */

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Link to='/'>
              <img className={classes.image} src={ideaLogo} alt="Idea logo" />
            </Link>
            <Typography color="inherit" className={classes.title}>
              <FormattedMessage id="header.title" />
            </Typography>
            <IconButton
              onClick={this.onChangeLanguage}
              color='inherit'
              className={classes.languageIcon}
            >
              <Tooltip title={<FormattedMessage id="header.changeLanguage" />} disableFocusListener>
                <TranslateOutlined />
              </Tooltip>
            </IconButton>
            {isAuthenticated ? authLinks : null}
            <img className={classes.image} src={axaLogo} alt="Axa logo" />
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMenuAdmin}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Header));
