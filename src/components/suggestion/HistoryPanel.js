import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import axios from 'axios';
import HistoryCard from './HistoryCard';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    padding: '15px',
  },
});

class HistoryPanel extends Component {
  state = {
    historyData: [],
    connected: false,
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`/api/history/suggestion/${this.props.suggestionSelected.id}`)
      .then((res) => {
        this.setState({
          historyData: res.data,
          connected: true,
        });
      })
      .catch((err) => {
      });
  }

  render() {
    const { classes } = this.props;
    const { historyData, connected } = this.state;
    if (!connected) {
      return null;
    }
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {historyData.map((hist) => (
            <HistoryCard
              key={hist.id}
              data={hist}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

HistoryPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestionSelected: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryPanel);
