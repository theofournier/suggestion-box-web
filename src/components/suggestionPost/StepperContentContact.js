import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import AssignmentIndOutlined from '@material-ui/icons/AssignmentIndOutlined';
import StepperButton from './StepperButton';
import { colors, fontFamily } from '../../utils/config';
import { isEmpty, isEmail } from '../../utils/helper';

const styles = {
  root: {
    justifyContent: 'center',
  },
  icon: {
    color: colors.primary,
    fontSize: 70,
  },
  title: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.title,
    fontSize: '35px',
  },
  text: {
    color: colors['axa-grey'],
    fontWeight: 400,
    fontFamily: fontFamily.text,
    fontSize: '17px',
  },
  titleContainer: {
    width: '850px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '850px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: '30px',
    alignContent: 'center',
  },
  formControl: {
    width: '850px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 'auto',
    marginTop: '10px',
  },
  textField: {
    marginTop: '0px',
    width: 700,
  },
  textFieldContainer: {
    marginTop: '20px',
  },
  required: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: fontFamily.text,
    color: colors['axa-grey'],
  },
  errorText: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: fontFamily.errorText,
    color: 'red',
  },
};

class StepperContentContact extends Component {
  state = {
    contributorNameError: false,
    contributorTeamError: false,
    contributorEmailError: false,
    contributorEmailErrorText: '',
  };

  inputsValidation = (values) => {
    let valid = true;
    if (isEmpty(values.contributorName)) {
      this.setState({
        contributorNameError: true,
      });
      valid = false;
    } else {
      this.setState({
        contributorNameError: false,
      });
    }

    if (isEmpty(values.contributorTeam)) {
      this.setState({
        contributorTeamError: true,
      });
      valid = false;
    } else {
      this.setState({
        contributorTeamError: false,
      });
    }

    if (isEmpty(values.contributorEmail)) {
      this.setState({
        contributorEmailError: true,
        contributorEmailErrorText: 'requiredLabel',
      });
      valid = false;
    } else if (!isEmail(values.contributorEmail)) {
      this.setState({
        contributorEmailError: true,
        contributorEmailErrorText: 'emailNotValid',
      });
      valid = false;
    } else {
      this.setState({
        contributorEmailError: false,
        contributorEmailErrorText: '',
      });
    }

    return valid;
  };

  handleNext = () => {
    const valid = this.inputsValidation(this.props.values);
    if (valid) {
      this.props.handleNext();
    }
  };

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleNext();
    }
  };

  errorMessage = (label) => {
    const { classes } = this.props;
    return (
      <Typography className={classes.errorText}>
        <FormattedMessage
          id={label}
        />
      </Typography>
    );
  }

  render() {
    const { classes, values, handleChange } = this.props;
    const {
      contributorNameError,
      contributorTeamError,
      contributorEmailError,
      contributorEmailErrorText,
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>
            <FormattedMessage
              id={'suggestion.stepperContent.contact.question'}
            />
          </Typography>
          <AssignmentIndOutlined className={classes.icon} />
        </div>
        <FormControl className={classes.formControl} error>
          <div className={classes.textFieldContainer}>
            <Typography
              className={classes.text}
            >
              <FormattedMessage
                id={'suggestion.stepperContent.contact.name'}
              />
            </Typography>
            <TextField
              error={contributorNameError}
              id="filled-name"
              value={values.contributorName}
              onChange={handleChange('contributorName')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onKeyPress={this.keyPress}
            />
            {contributorNameError ? (
              this.errorMessage('suggestion.stepperContent.requiredLabel')
            ) : null}
          </div>
          <div className={classes.textFieldContainer}>
            <Typography
              className={classes.text}
            >
              <FormattedMessage
                id={'suggestion.stepperContent.contact.team'}
              />
            </Typography>
            <TextField
              error={contributorTeamError}
              id="filled-team"
              value={values.contributorTeam}
              onChange={handleChange('contributorTeam')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onKeyPress={this.keyPress}
            />
            {contributorTeamError ? (
              this.errorMessage('suggestion.stepperContent.requiredLabel')
            ) : null}
          </div>
          <div className={classes.textFieldContainer}>
            <Typography
              className={classes.text}
            >
              <FormattedMessage
                id={'suggestion.stepperContent.contact.email'}
              />
            </Typography>
            <TextField
              error={contributorEmailError}
              id="filled-email"
              value={values.contributorEmail}
              onChange={handleChange('contributorEmail')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onKeyPress={this.keyPress}
            />
            {contributorEmailError ? (
              this.errorMessage(`suggestion.stepperContent.${contributorEmailErrorText}`)
            ) : null}
          </div>
        </FormControl>
        <div className={classes.buttonContainer}>
          <Typography className={classes.required}><FormattedMessage id={'suggestion.stepperContent.required'} /></Typography>
          <StepperButton
            nextButtonDisabled={false}
            previousButtonDisabled={false}
            nextButtonOnClick={this.handleNext}
            previousButtonOnClick={this.props.handleBack}
            nextButtonLabel={
              <FormattedMessage id={'suggestion.stepper.button.next'} />
            }
            previousButtonLabel={
              <FormattedMessage id={'suggestion.stepper.button.back'} />
            }
          />
        </div>
      </div>
    );
  }
}

StepperContentContact.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepperContentContact);
