import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import {
  colors, gatewayStatusList, approvalStatusList, fontFamily,
} from '../../../utils/config';
import { datetimeFormatting, intToString } from '../../../utils/helper';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    position: 'relative',
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  icon: {
    color: colors.primary,
    height: 30,
    width: 30,
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
  remarkText: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    fontFamily: fontFamily.errorText,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: colors['secondary-light'],
  },
  progressContainer: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
});

class EditBox extends Component {
  state = {
    data: {
      id: '',
      date: '',
      category: '',
      description: '',
      targetedSystem: '',
      personDayCurrent: '',
      personDayFuture: '',
      cost: '',
      contributorName: '',
      contributorTeam: '',
      contributorEmail: '',
      gatewayStatus: '',
      approvalStatus: '',
      remark: '',
      editDate: '',
    },
    errorSave: false,
    sending: false,
  }

  componentDidMount = () => {
    this.setState({ data: { ...this.props.data, remark: this.props.data.remark !== null ? this.props.data.remark : undefined } });
  }

  handleChange = (e) => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  handleSave = () => {
    const { data } = this.state;
    const suggestionTemp = { ...data };
    this.setState({
      sending: true,
    });

    suggestionTemp.id = intToString(suggestionTemp.id);
    suggestionTemp.personDayCurrent = intToString(suggestionTemp.personDayCurrent);
    suggestionTemp.personDayFuture = intToString(suggestionTemp.personDayFuture);
    suggestionTemp.cost = intToString(suggestionTemp.cost);

    axios
      .put(`/api/suggestion/${suggestionTemp.id}`, suggestionTemp, {
        params: {
          email: 1,
          login: this.props.auth.user.login,
        },
      })
      .then((res) => {
        this.setState({
          errorSave: false,
          sending: false,
        });
        this.props.fetchData();
        this.props.handleOpenEditBox(false);
        this.props.handleOpenSnackbar();
      })
      .catch((err) => {
        this.setState({
          errorSave: true,
          sending: false,
        });
      });
  };

  render() {
    const {
      classes, handleOpenEditBox,
    } = this.props;
    const { data, errorSave, sending } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.gatewayStatus' /></Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl>
              <Select
                value={data.gatewayStatus}
                onChange={this.handleChange}
                name="gatewayStatus"
              >
                {gatewayStatusList.map((gatewayStatus) => (
                  <MenuItem value={gatewayStatus} key={gatewayStatus}><FormattedMessage id={`admin.gatewayStatus.${gatewayStatus}`} /></MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.approvalStatus' /></Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl >
              <Select
                value={data.approvalStatus}
                onChange={this.handleChange}
                name="approvalStatus"
              >
                {approvalStatusList.map((approvalStatus) => (
                  <MenuItem value={approvalStatus} key={approvalStatus}><FormattedMessage id={`admin.approvalStatus.${approvalStatus}`} /></MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography className={classes.field}><FormattedMessage id='suggestionList.status.remark' /></Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              multiline
              value={(data.remark || undefined)}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              name="remark"
              rowsMax="8"
              className={classes.remarkText}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.text}><FormattedMessage id='suggestionList.status.lastEdit' /> {datetimeFormatting(data.editDate)}</Typography>
          </Grid>
        </Grid>
        {errorSave
          ? <Typography className={classes.errorText}>
            <FormattedMessage id={'admin.dialog.errorSave'} />
          </Typography> : null}
        {sending ? (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
            <div className={classes.iconButton}>
              <IconButton onClick={this.handleSave}><DoneOutlined className={classes.icon} /></IconButton>
              <IconButton onClick={() => handleOpenEditBox(false)}><CancelOutlined className={classes.icon} /></IconButton>
            </div>
        )}
      </div>
    );
  }
}

EditBox.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  handleOpenEditBox: PropTypes.func,
  handleOpenSnackbar: PropTypes.func,
  fetchData: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(EditBox));
