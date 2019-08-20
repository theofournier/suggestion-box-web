import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {
  colors, gatewayStatusList, approvalStatusList, fontFamily,
} from '../../utils/config';
import { intToString } from '../../utils/helper';

const styles = {
  root: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    alignItems: 'center',
    backgroundColor: colors['background-grey'],
  },
  saveButton: {
    fontFamily: fontFamily.button,
    backgroundColor: colors.primary,
    color: 'white',
    '&:hover': {
      backgroundColor: colors['secondary-light'],
    },
  },
  remarkField: {
    minWidth: 400,
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily: fontFamily.text,
  },
};

class EditInformationPanel extends Component {
  state = {
    suggestionSelected: {
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
  }

  componentDidMount = () => {
    this.setState({ suggestionSelected: { ...this.props.suggestionSelected, remark: this.props.suggestionSelected.remark !== null ? this.props.suggestionSelected.remark : undefined } });
  }

  handleChange = (e) => {
    this.setState({ suggestionSelected: { ...this.state.suggestionSelected, [e.target.name]: e.target.value } });
  };

  handleSave = () => {
    const { suggestionSelected } = this.state;
    const suggestionTemp = { ...suggestionSelected };

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
        this.props.fetchData();
        this.setState({
          errorSave: false,
        });
        this.props.handleOpenSnackbar();
      })
      .catch((err) => {
        this.setState({
          errorSave: true,
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { suggestionSelected, errorSave } = this.state;
    return (
      <div className={classes.root}>
        <div>
          <Typography className={classes.label}>
            <FormattedMessage
              id={'admin.dialog.gatewayStatus'}
            />
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={suggestionSelected.gatewayStatus}
              onChange={this.handleChange}
              name="gatewayStatus"
            >
              {gatewayStatusList.map((gatewayStatus) => (
                <MenuItem value={gatewayStatus} key={gatewayStatus}><FormattedMessage id={`admin.gatewayStatus.${gatewayStatus}`} /></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography className={classes.label}>
            <FormattedMessage
              id={'admin.dialog.approvalStatus'}
            />
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={suggestionSelected.approvalStatus}
              onChange={this.handleChange}
              name="approvalStatus"
            >
              {approvalStatusList.map((approvalStatus) => (
                <MenuItem value={approvalStatus} key={approvalStatus}><FormattedMessage id={`admin.approvalStatus.${approvalStatus}`} /></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography className={classes.label}>
            <FormattedMessage
              id={'admin.dialog.remark'}
            />
          </Typography>
          <TextField
            id="filled-remark"
            multiline
            value={suggestionSelected.remark}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            name="remark"
            rowsMax="8"
            className={classes.remarkField}
          />
        </div>
        {errorSave
          ? <Typography>
            <FormattedMessage id={'admin.dialog.errorSave'} />
          </Typography> : null}
        <Button onClick={this.handleSave} className={classes.saveButton}>
          <FormattedMessage id={'admin.dialog.save'} />
        </Button>
      </div>
    );
  }
}

EditInformationPanel.propTypes = {
  classes: PropTypes.object,
  suggestionSelected: PropTypes.object,
  fetchData: PropTypes.func,
  handleOpenSnackbar: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(EditInformationPanel));
