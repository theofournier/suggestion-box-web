import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Description from './Description';
import HistoryList from './HistoryList';
import Informations from './Informations';
import {
  fontFamily,
} from '../../utils/config';

const styles = () => ({
  root: {
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'left',
  },
  title: {
    marginTop: 50,
    fontSize: 35,
    fontFamily: fontFamily.title,
  },
  line: {
    borderColor: 'blue',
    width: '50%',
    marginLeft: 0,
    minWidth: 200,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },
  leftContainer: {
    flexGrow: 1,
    flexBasis: '46%',
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  rightContainer: {
    flexGrow: 1,
    flexBasis: '46%',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
});

class Suggestion extends Component {
  state = {
    suggestion: {},
    connected: false,
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    const { match: { params } } = this.props;
    axios
      .get(`/api/suggestion/${params.id}`)
      .then((res) => {
        this.setState({
          suggestion: res.data[0],
          connected: true,
        });
      })
      .catch((err) => {

      });
  }

  updatePage = () => {
    window.location.reload();
  }

  render() {
    const { suggestion, connected } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          {suggestion.title}
        </Typography>
        <hr className={classes.line}></hr>
        <div className={classes.mainContainer}>
          <div className={classes.leftContainer}>
            {connected ? <Description
              descriptionContent={suggestion.description}
            /> : null}
            {connected ? <HistoryList
              suggestionSelected={suggestion}
            /> : null}
          </div>
          <div className={classes.rightContainer}>
            {connected ? <Informations
              suggestion={suggestion}
              updatePage={this.updatePage}
            /> : null}
          </div>
        </div>


      </div>
    );
  }
}

export default withStyles(styles)(Suggestion);
