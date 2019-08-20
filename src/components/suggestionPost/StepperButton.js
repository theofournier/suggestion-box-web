import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors, fontFamily } from '../../utils/config';

const styles = (theme) => ({
  backButton: {
    marginRight: theme.spacing.unit,
    color: colors['axa-grey'],
    fontFamily: fontFamily.button,
    borderColor: colors['axa-grey'],
    fontWeight: 600,
    borderRadius: 0,
    fontSize: 16,
  },
  nextButton: {
    color: 'white',
    fontFamily: fontFamily.button,
    backgroundColor: colors['axa-red'],
    '&:hover': {
      backgroundColor: colors['axa-red-hover'],
    },
    fontWeight: 600,
    borderRadius: 0,
    fontSize: 16,
  },
});

const StepperButton = ({
  classes,
  nextButtonVisible,
  previousButtonVisible,
  nextButtonLabel,
  previousButtonLabel,
  nextButtonOnClick,
  previousButtonOnClick,
}) => {
  return (
    <div>
      <div>
        <Button
          variant="outlined"
          onClick={previousButtonOnClick}
          className={classes.backButton}
          disabled={previousButtonVisible}
        >
          {previousButtonLabel}
        </Button>
        <Button
          variant="contained"
          className={classes.nextButton}
          onClick={nextButtonOnClick}
          disabled={nextButtonVisible}
        >
          {nextButtonLabel}
        </Button>
      </div>
    </div>
  );
};

StepperButton.propTypes = {
  classes: PropTypes.object,
  nextButtonDisabled: PropTypes.bool.isRequired,
  previousButtonDisabled: PropTypes.bool.isRequired,
  nextButtonLabel: PropTypes.object,
  previousButtonLabel: PropTypes.object,
  nextButtonOnClick: PropTypes.func,
  previousButtonOnClick: PropTypes.func,
};

export default withStyles(styles)(StepperButton);
