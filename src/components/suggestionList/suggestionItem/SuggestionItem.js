import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandLessOutlined from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';

import InformationBox from './InformationBox';
import StatusBox from './StatusBox';
import EditBox from './EditBox';
import DetailBox from './DetailBox';
import { colors } from '../../../utils/config';

const styles = {
  root: {
    margin: '0 0 20px 0',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  informationContainer: {
    flexGrow: 1,
    flexBasis: '50%',
    borderRight: `0.2em solid ${colors['background-grey']}`,
    marginRight: '-0.2em',
  },
  statusContainer: {
    flexGrow: 1,
    flexBasis: '50%',
  },
  editContainer: {
    flexGrow: 1,
    flexBasis: '50%',
  },
  secondContainer: {
    borderTop: `0.2em solid ${colors['background-grey']}`,
  },
  extendBar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    height: '15px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors['secondary-dark'],
    },
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  arrowIcon: {
    color: 'white',
    height: '100%',
  },
};

class SuggestionItem extends Component {
  state = {
    detailOpen: false,
    editBoxOpen: false,
  }

  handleOpenDetail = (detailOpen) => {
    this.setState({ detailOpen });
  }

  handleOpenEditBox = (editBoxOpen) => {
    this.setState({ editBoxOpen });
  }

  render() {
    const {
      classes, data, fetchData, handleOpenSnackbar,
    } = this.props;
    const { detailOpen, editBoxOpen } = this.state;
    return (
      <Paper elevation={3} className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.informationContainer}>
            <InformationBox data={data} />
          </div>
          {editBoxOpen
            ? <div className={classes.editContainer}>
              <EditBox
                data={data}
                handleOpenEditBox={this.handleOpenEditBox}
                fetchData={fetchData}
                handleOpenSnackbar={handleOpenSnackbar} />
            </div>
            : <div className={classes.statusContainer}>
              <StatusBox data={data} handleOpenEditBox={this.handleOpenEditBox} />
            </div>}
        </div>
        {detailOpen
          ? <div className={classes.secondContainer}>
            <DetailBox data={data} />
          </div>
          : null}
        <div className={classes.extendBar} onClick={() => this.handleOpenDetail(!detailOpen)}>
          {detailOpen ? <ExpandLessOutlined className={classes.arrowIcon} /> : <ExpandMoreOutlined className={classes.arrowIcon} />}
        </div>
      </Paper>
    );
  }
}

SuggestionItem.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  fetchData: PropTypes.func,
  handleOpenSnackbar: PropTypes.func,
};
export default withStyles(styles)(SuggestionItem);
