import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const styles = () => ({
  root: {
    marginTop: 30,
    minWidth: 300,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 15,
  },
  textField: {
    minWidth: 300,
    width: '100%',
    padding: 10,
  },
});

class Description extends Component {
  render() {
    const { classes, descriptionContent } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          <b><FormattedMessage id="suggestion.description.title" /> : </b>
        </Typography>
        <TextField
          id="filled-description"
          multiline
          InputProps={{
            readOnly: true,
          }}
          rows="15"
          value={descriptionContent}
          margin="normal"
          variant="outlined"
          name="description"
          className={classes.textField}
        />
      </div>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
  descriptionContent: PropTypes.string.isRequired,
};

export default withStyles(styles)(Description);
