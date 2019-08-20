import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { colors, fontFamily } from '../../utils/config';

const styles = {
  step: {
    '& $completed': {
      color: colors['secondary-light'],
    },
    '& $active': {
      color: colors['axa-red'],
    },
    fontFamily: fontFamily.text,
  },
  active: {}, // needed so that the &$active tag works
  completed: {},
};

const HorizontalStepper = ({ classes, getSteps, activeStep }) => {
  const steps = getSteps();

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step
            key={label}
            classes={{
              root: classes.step,
              completed: classes.completed,
            }}
          >
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

HorizontalStepper.propTypes = {
  classes: PropTypes.object,
  getSteps: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default withStyles(styles)(HorizontalStepper);
