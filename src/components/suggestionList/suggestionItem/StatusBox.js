import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IconButton, Typography } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { FormattedMessage } from 'react-intl';
import { colors, fontFamily } from '../../../utils/config';
import { datetimeFormatting } from '../../../utils/helper';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  icon: {
    color: colors.primary,
    height: 40,
    width: 40,
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
  remarkContainer: {
    maxHeight: '100px',
    overflow: 'auto',
  },
};

class StatusBox extends Component {
  render() {
    const { classes, data, handleOpenEditBox } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.gatewayStatus' /></Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.text}><FormattedMessage id={`admin.gatewayStatus.${data.gatewayStatus}`} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.approvalStatus' /></Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.text}><FormattedMessage id={`admin.approvalStatus.${data.approvalStatus}`} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.remark' /></Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            {data.remark ? <div className={classes.remarkContainer}>
              {data.remark.split('\n').map((ele, i) => (
                <Typography key={i} className={classes.text}>{ele}</Typography>
              ))}
            </div>
              : null}
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.text}><FormattedMessage id='suggestionList.status.lastEdit' /> {datetimeFormatting(data.editDate)}</Typography>
          </Grid>
        </Grid>
        <IconButton className={classes.iconButton} onClick={() => handleOpenEditBox(true)}><EditOutlined className={classes.icon} /></IconButton>
      </div>
    );
  }
}

StatusBox.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  handleOpenEditBox: PropTypes.func,
};
export default withStyles(styles)(StatusBox);
