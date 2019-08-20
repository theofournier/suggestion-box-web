import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  fontFamily, colors, gatewayStatusList, approvalStatusList,
} from '../../utils/config';
import {
  intToString, datetimeFormatting,
} from '../../utils/helper';
import MySnackbarContent from '../elements/MySnackbarContent';

const styles = (theme) => ({
  root: {
    marginTop: 30,
    minWidth: 300,
    width: '100%',
    border: '2px solid blue',
    padding: 10,
    position: 'relative',
  },
  title: {
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: fontFamily.text,
  },
  remarkContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remark: {
    fontSize: 15,
    flexGrow: 1,
    flexBasis: '10%',
    fontFamily: fontFamily.text,
  },
  remarkBox: {
    fontSize: 15,
    flexGrow: 1,
    flexBasis: '90%',
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
  iconButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  icon: {
    color: colors.primary,
    height: 30,
    width: 30,
  },
  iconButtonBis: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  iconBis: {
    color: colors.primary,
    height: 30,
    width: 30,
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
});

class EditInformations extends Component {
  state = {
    editOpen: false,
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
    snackbarOpen: false,
  }

  componentDidMount = () => {
    this.setState({ data: { ...this.props.suggestion, remark: this.props.suggestion.remark !== null ? this.props.suggestion.remark : undefined } });
  }

  handleChange = (e) => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  handleOpenEditBox = (editOpen) => {
    this.setState({ editOpen });
  }

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
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
        this.props.updatePage();
        this.handleOpenEditBox(false);
        this.handleOpenSnackbar();
      })
      .catch((err) => {
        this.setState({
          errorSave: true,
          sending: false,
        });
      });
  };


  render() {
    const { classes } = this.props;
    const {
      editOpen, snackbarOpen, sending, errorSave, data,
    } = this.state;

    const editClosed = (<>
      <Typography variant="h4" className={classes.text}>
        <b><FormattedMessage id={'suggestion.edit.gatewayStatus'} />:</b> {data.gatewayStatus ? <FormattedMessage id={`admin.gatewayStatus.${data.gatewayStatus}`} /> : null}
      </Typography>
      <Typography variant="h4" className={classes.text}>
        <b><FormattedMessage id={'suggestion.edit.approvalStatus'} />:</b> {data.approvalStatus ? <FormattedMessage id={`admin.approvalStatus.${data.approvalStatus}`} /> : null}
      </Typography>
      <div className={classes.remarkContainer}>
        <Typography variant="h4" className={classes.remark}>
          <b><FormattedMessage id={'suggestion.edit.remark'} />:</b>
        </Typography>
        <TextField
          id="filled-description"
          multiline
          InputProps={{
            readOnly: true,
          }}
          rows="8"
          value={data.remark}
          margin="normal"
          variant="outlined"
          name="description"
          className={classes.remarkBox}
        />
      </div>
      <Typography className={classes.text}><FormattedMessage id='suggestionList.status.lastEdit' /> {datetimeFormatting(data.editDate)}</Typography>
      <IconButton className={classes.iconButton} onClick={() => this.handleOpenEditBox(true)}><EditOutlined className={classes.icon} /></IconButton>
    </>);

    const editOpened = (<>
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
          <div className={classes.iconButtonBis}>
            <IconButton onClick={this.handleSave}><DoneOutlined className={classes.iconBis} /></IconButton>
            <IconButton onClick={() => this.handleOpenEditBox(false)}><CancelOutlined className={classes.iconBis} /></IconButton>
          </div>
      )}
    </>
    );

    return (
      <div className={classes.root}>
        {editOpen
          ? editOpened : editClosed}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <MySnackbarContent
            onClose={this.handleCloseSnackbar}
            variant="success"
            message={<FormattedMessage id={'admin.successSave'} />}
          />
        </Snackbar>
      </div>
    );
  }
}

EditInformations.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestion: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(EditInformations));
