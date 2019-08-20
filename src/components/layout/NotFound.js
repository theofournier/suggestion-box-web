import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { colors, fontFamily } from '../../utils/config';
import error404Picture from '../../images/error404Picture.jpg';

const styles = {
  root: {
    width: '100%',
    justifyContent: 'center',
  },
  error404: {
    justifyContent: 'left',
    color: colors['axa-grey'],
    fontSize: '70px',
    fontWeight: 700,
    fontFamily: fontFamily.title,
    lineHeight: '70px',
    letterSpacing: '0.015em',
  },
  text: {
    color: colors['axa-grey'],
    fontSize: '30px',
    fontWeight: 400,
    fontFamily: fontFamily.text,
    marginTop: '50px',
  },
  button: {
    marginTop: '20px',
    color: 'white',
    backgroundColor: colors['axa-red'],
    '&:hover': {
      backgroundColor: colors['axa-red-hover'],
    },
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: 0,
    paddingStart: '30px',
    paddingEnd: '30px',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontFamily: fontFamily.button,
    width: '250px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    backgroundImage: `url('${error404Picture}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
    width: '40%',
  },
  textContainer: {
    marginTop: '25vh',
    marginLeft: '10vh',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: 'left',
  },
};

const NotFound = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <Typography className={classes.error404}><FormattedMessage id="notFound.error404" /></Typography>
          <Typography className={classes.text}><FormattedMessage id="notFound.text" /></Typography>
          <Button className={classes.button} to='/' component={Link}><FormattedMessage id="notFound.goToHome" /></Button>
        </div>
        <div className={classes.imageContainer}></div>
      </div>
    </div>
  );
};


NotFound.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NotFound);
