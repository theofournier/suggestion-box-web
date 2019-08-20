import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';
import StepperButton from './StepperButton';
import { colors, fontFamily } from '../../utils/config';
import { isEmpty, isNumber, isDecimal } from '../../utils/helper';

const styles = {
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
  root: {
    justifyContent: 'center',
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
    justifyContent: 'flex-end',
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
  textFieldTargetedSystem: {
    marginTop: '0px',
    width: 700,
  },
  textFieldPersonDay: {
    marginEnd: '50px',
    marginTop: '0px',
    width: 200,
  },
  textFieldCost: {
    width: 400,
    marginTop: '0px',
  },
  textFieldContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  textFieldRawContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '0px',
  },
  errorText: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: fontFamily.errorText,
    color: 'red',
  },
};

class StepperContentMore extends Component {
  state = {
    targetedSystemError: false,
    personDayCurrentError: false,
    personDayFutureError: false,
    costError: false,
  };

  inputsValidation = (values) => {
    let valid = true;

    if (
      !isEmpty(values.personDayCurrent)
      && (!isNumber(values.personDayCurrent) || values.personDayCurrent < 0)
    ) {
      this.setState({
        personDayCurrentError: true,
      });
      valid = false;
    } else {
      this.setState({
        personDayCurrentError: false,
      });
    }

    if (
      !isEmpty(values.personDayFuture)
      && (!isNumber(values.personDayFuture) || values.personDayFuture < 0)
    ) {
      this.setState({
        personDayFutureError: true,
      });
      valid = false;
    } else {
      this.setState({
        personDayFutureError: false,
      });
    }

    if (
      !isEmpty(values.cost)
      && (!isDecimal(values.cost) || values.cost < 0)
    ) {
      this.setState({
        costError: true,
      });
      valid = false;
    } else {
      this.setState({
        costError: false,
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
      targetedSystemError,
      personDayCurrentError,
      personDayFutureError,
      costError,
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>
            <FormattedMessage
              id={'suggestion.stepperContent.more.question'}
            />
          </Typography>
          <MonetizationOnOutlined className={classes.icon} />
        </div>
        <FormControl className={classes.formControl} error>
          <div className={classes.textFieldContainer}>
            <Typography className={classes.text}>
              <FormattedMessage
                id={'suggestion.stepperContent.more.targetedSystem.question'}
              />
            </Typography>
            <TextField
              error={targetedSystemError}
              id='targeted-system-input'
              value={values.targetedSystem}
              onChange={handleChange('targetedSystem')}
              className={classes.textFieldTargetedSystem}
              margin="normal"
              variant="outlined"
              onKeyPress={this.keyPress}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <Typography className={classes.text}>
              <FormattedMessage
                id={'suggestion.stepperContent.more.personDay.question'}
              />
            </Typography>
            <div className={classes.textFieldRawContainer}>
              <div>
                <TextField
                  error={personDayCurrentError}
                  id="filled-number"
                  value={values.personDayCurrent}
                  onChange={handleChange('personDayCurrent')}
                  className={classes.textFieldPersonDay}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onKeyPress={this.keyPress}
                  label={<FormattedMessage
                    id={'suggestion.stepperContent.more.personDay.current'}
                  />}
                />
                {personDayCurrentError ? (
                  this.errorMessage('suggestion.stepperContent.notANumber')
                ) : null}
              </div>
              <div>
                <TextField
                  error={personDayFutureError}
                  id="filled-number"
                  value={values.personDayFuture}
                  onChange={handleChange('personDayFuture')}
                  className={classes.textFieldPersonDay}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onKeyPress={this.keyPress}
                  label={<FormattedMessage
                    id={'suggestion.stepperContent.more.personDay.future'}
                  />}
                />
                {personDayFutureError ? (
                  this.errorMessage('suggestion.stepperContent.notANumber')
                ) : null}
              </div>
            </div>
          </div>
          <div className={classes.textFieldContainer}>
            <Typography className={classes.text}>
              <FormattedMessage
                id={'suggestion.stepperContent.more.cost.question'}
              />
            </Typography>
            <div>
              <TextField
                error={costError}
                id="filled-number"
                value={values.cost}
                onChange={handleChange('cost')}
                className={classes.textFieldCost}
                margin="normal"
                variant="outlined"
                type="number"
                onKeyPress={this.keyPress}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <FormattedMessage
                      id={'suggestion.stepperContent.more.cost.jpy'}
                    />
                  </InputAdornment>,
                }}
              />
              {costError ? (
                this.errorMessage('suggestion.stepperContent.notANumber')
              ) : null}
            </div>
          </div>
        </FormControl>
        <div className={classes.buttonContainer}>
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

StepperContentMore.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepperContentMore);
