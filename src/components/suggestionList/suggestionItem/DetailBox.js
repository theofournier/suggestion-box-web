import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import { colors, fontFamily } from '../../../utils/config';

const styles = {
  root: {
    padding: '20px',
  },
  text: {
    color: colors['axa-grey'],
    fontWeight: 400,
    fontFamily: fontFamily.text,
    fontSize: '15px',
  },
  field: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.text,
    fontSize: '15px',
  },
  description: {
    maxHeight: '200px',
    overflow: 'auto',
    margin: '5px 0 0 0',
  },
  personDayContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: '5% 0 0 0',
  },
  textFieldColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textFieldRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paddingLeft: {
    padding: '0 0 0 20px',
  },
  marginTop: {
    margin: '5% 0 0 0',
  },
};

class DetailBox extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.description' /></Typography>
            {data.description ? <div className={classes.description}>
              {data.description.split('\n').map((ele, i) => (
                <Typography key={i} className={classes.text}>{ele}</Typography>
              ))}
            </div>
              : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.textFieldColumnContainer}>
              <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.targetedSystem' /></Typography>
              <Typography className={classNames(classes.text, classes.paddingLeft)}>{data.targetedSystem}</Typography>
            </div>
            <div className={classes.personDayContainer}>
              <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.personDay' /></Typography>
              <Grid container spacing={1} className={classes.paddingLeft}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.personDayCurrent' /></Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.text}>{data.personDayCurrent}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.personDayFuture' /></Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.text}>{data.personDayFuture}</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className={classes.textFieldColumnContainer}>
              <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.email' /></Typography>
              <Typography className={classNames(classes.text, classes.paddingLeft)}>{data.contributorEmail}</Typography>
            </div>
            <div className={classNames(classes.textFieldColumnContainer, classes.marginTop)}>
              <Typography className={classes.field}><FormattedMessage id='suggestionList.detail.team' /></Typography>
              <Typography className={classNames(classes.text, classes.paddingLeft)}>{data.contributorTeam}</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DetailBox.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(DetailBox);
