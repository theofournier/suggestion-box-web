import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import homePicture from '../../images/idea picture.jpg';
import { colors, fontFamily } from '../../utils/config';

const styles = {
  root: {
    height: '100%',
  },
  title: {
    color: colors['secondary-dark'],
    fontSize: '62px',
    fontWeight: 700,
    fontFamily: fontFamily.title,
  },
  description: {
    color: colors['secondary-dark'],
    fontSize: '35px',
    fontWeight: 400,
    margin: '0 0 40px',
    fontFamily: fontFamily.text,
  },
  bannerImageContainer: {
    position: 'relative',
    backgroundImage: `url('${homePicture}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
  },
  titleBlock: {
    padding: '100px 10%',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleMain: {
    margin: '0 0 20px',
  },
  titleSecond: {
    margin: '0 0 30px',
    padding: '0 33%',
  },
  button: {
    color: 'white',
    backgroundColor: colors['axa-red'],
    '&:hover': {
      backgroundColor: colors['axa-red-hover'],
    },
    borderRadius: 0,
    fontSize: '18px',
    fontWeight: 600,
    padding: '10px 30px',
    fontFamily: fontFamily.button,
  },
};

class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.bannerImageContainer}>
          <div className={classes.titleBlock}>
            <div className={classes.titleMain}>
              <Typography className={classes.title}>
                <FormattedMessage id="landing.title" />
              </Typography>
            </div>
            <div className={classes.titleSecond}>
              <Typography className={classes.description}>
                <FormattedMessage id="landing.description" />
              </Typography>
              <Button className={classes.button} to='/newsuggestion' component={Link}>
                <FormattedMessage id="landing.button" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Landing);
