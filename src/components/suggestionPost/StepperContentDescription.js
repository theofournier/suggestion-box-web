import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import WbIncandescentOutlined from '@material-ui/icons/WbIncandescentOutlined';
import { colors, fontFamily } from '../../utils/config';
import { isEmpty } from '../../utils/helper';

import StepperButton from './StepperButton';

const styles = {
  icon: {
    color: colors.primary,
    fontSize: 70,
  },
  root: {
    justifyContent: 'center',
  },
  title: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.title,
    fontSize: '35px',
  },
  titleContainer: {
    width: '850px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    alignItems: 'center',
    marginBottom: '15px',
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
  textField: {
    marginTop: '15px',
    width: 1000,
  },
  formControl: {
    width: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 'auto',
    marginTop: '10px',
  },
  textFieldContainer: {
    marginTop: '10px',
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

class StepperContentDescription extends Component {
  state = {
    titleError: false,
    descriptionError: false,
  };

  inputsValidation = (values) => {
    let valid = true;
    if (isEmpty(values.description)) {
      this.setState({
        descriptionError: true,
      });
      valid = false;
    } else {
      this.setState({
        descriptionError: false,
      });
    }
    if (isEmpty(values.title)) {
      this.setState({
        titleError: true,
      });
      valid = false;
    } else {
      this.setState({
        titleError: false,
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
    const { descriptionError, titleError } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>
            <FormattedMessage
              id={'suggestion.stepperContent.description.question'}
            />
          </Typography>
          <WbIncandescentOutlined className={classes.icon} />
        </div>
        <FormControl className={classes.formControl} error>
          <div className={classes.textFieldContainer}>
            <TextField
              required
              error={titleError}
              id="filled-title"
              label={
                <FormattedMessage
                  id={'suggestion.stepperContent.description.title'}
                />
              }
              value={values.title}
              onChange={handleChange('title')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              autoComplete='off'
            />
            {titleError ? (
              this.errorMessage('suggestion.stepperContent.requiredLabel')
            ) : null}
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              required
              error={descriptionError}
              id="filled-textarea"
              label={
                <FormattedMessage
                  id={'suggestion.stepperContent.description.label'}
                />
              }
              rows="15"
              multiline
              value={values.description}
              onChange={handleChange('description')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            {descriptionError ? (
              this.errorMessage('suggestion.stepperContent.requiredLabel')
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

StepperContentDescription.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepperContentDescription);
