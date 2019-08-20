import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SuggestionTable from './SuggestionTable';

const styles = {
  root: {
    marginTop: '10px',
  },
};

class Admin extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.root}><SuggestionTable /></div>;
  }
}


Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
