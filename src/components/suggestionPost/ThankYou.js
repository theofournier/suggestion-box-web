import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { colors, fontFamily } from '../../utils/config';
import thankYouPicture from '../../images/thank you.jpg';

const styles = {
  root: {
    marginTop: '-10px',
  },
  title: {
    color: colors['axa-grey'],
    fontSize: '70px',
    fontWeight: 700,
    fontFamily: fontFamily.title,
    lineHeight: '70px',
    letterSpacing: '0.015em',
  },
  text: {
    color: colors['axa-grey'],
    fontSize: '35px',
    fontWeight: 400,
    fontFamily: fontFamily.text,
    marginTop: '30px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  button: {
    color: 'white',
    backgroundColor: colors['axa-red'],
    '&:hover': {
      backgroundColor: colors['axa-red-hover'],
    },
    marginTop: '40px',
    width: '250px',
    borderRadius: 0,
    fontSize: '18px',
    fontWeight: 600,
    padding: '10px 0',
    fontFamily: fontFamily.button,
  },
  imageContainer: {
    position: 'relative',
    backgroundImage: `url('${thankYouPicture}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
    width: '45%',
  },
  textContainer: {
    margin: '25vh 100px 0',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: 'left',
  },
};

const ThankYou = ({ classes, resetStepper }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>

        <div className={classes.imageContainer}></div>
        <div className={classes.textContainer}>
          <Typography className={classes.title}>
            <FormattedMessage id={'suggestion.stepperContent.thankYou.thankYou'} />
          </Typography>
          <Typography className={classes.text}>
            <FormattedMessage
              id={'suggestion.stepperContent.thankYou.keepInTouch'}
            />
          </Typography>
          <Button
            onClick={resetStepper}
            className={classes.button}
          >
            <FormattedMessage
              id={'suggestion.stepperContent.thankYou.newSuggestion'}
            />
          </Button>
        </div>
      </div >
    </div >
  );
};
ThankYou.propTypes = {
  classes: PropTypes.object,
  resetStepper: PropTypes.func,
};
export default withStyles(styles)(ThankYou);
