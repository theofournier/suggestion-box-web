import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import HistoryPanel from './HistoryPanel';

const styles = () => ({
  root: {
    minWidth: 300,
    width: 500,
    padding: 10,
  },
  title: {
    fontSize: 15,
  },
});

class HistoryList extends Component {
  render() {
    const { classes, suggestionSelected } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          <b><FormattedMessage id="suggestion.historyList.title" /> : </b>
        </Typography>
        <HistoryPanel
          suggestionSelected={suggestionSelected}
        />
      </div>
    );
  }
}

HistoryList.propTypes = {
  classes: PropTypes.object,
  suggestionSelected: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryList);
