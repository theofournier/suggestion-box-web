import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import axios from 'axios';
import HistoryCard from './HistoryCard';
import {
  colors,
} from '../../utils/config';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '200vh',
    backgroundColor: colors['background-grey'],
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    padding: '15px',
  },
};

class HistoryPanel extends Component {
  state = {
    historyData: [],
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
        });
      })
      .catch((err) => {
      });
  }

  render() {
    const { classes } = this.props;
    const { historyData } = this.state;
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
