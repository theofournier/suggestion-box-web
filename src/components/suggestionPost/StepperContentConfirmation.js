import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendOutlined from '@material-ui/icons/SendOutlined';
import StepperButton from './StepperButton';
import { colors, fontFamily } from '../../utils/config';

const styles = (theme) => ({
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
  confirmationContainer: {
    width: '850px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 'auto',
    marginTop: '20px',
  },
  confirmationList: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: `2px solid ${colors.secondary}`,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: colors['secondary-light'],
  },
  progressContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    fontFamily: fontFamily.errorText,
  },
  errorContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textSuggestionTitle: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  textSuggestion: {
    fontSize: 16,
    color: colors['axa-grey'],
    fontWeight: 400,
    fontFamily: fontFamily.text,
    lineHeight: '24px',
  },
});

class StepperContentConfirmation extends Component {
  getCategoryLabel = () => {
    const { values } = this.props;
    const { formatMessage } = this.props.intl;
    if (values.category.id === 'other') { return `${formatMessage({ id: `suggestion.stepperContent.categories.${values.category.id}` })} : ${values.category.text}`; }
    return <FormattedMessage id={`suggestion.stepperContent.categories.${values.category.id}`} />;
  }


  render() {
    const {
      classes, values, sending, sendError,
    } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>
            <FormattedMessage
              id={'suggestion.stepperContent.confirmation.question'}
            />
          </Typography>
          <SendOutlined className={classes.icon} />
        </div>
        <div className={classes.confirmationContainer}>
          <List className={classes.confirmationList} subheader={<li />}>
            <li
              key={'category'}
              className={classes.listSection}
            >
              <ul className={classes.ul}>
                <ListSubheader>{<FormattedMessage id={'suggestion.stepperContent.categories.question'} />}</ListSubheader>
                <ListItem key={'category'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}>{this.getCategoryLabel()}</Typography>} />
                </ListItem>
              </ul>
            </li>
            <li
              key={'description'}
              className={classes.listSection}
            >
              <ul className={classes.ul}>
                <ListSubheader>{<FormattedMessage id={'suggestion.stepperContent.description.question'} />}</ListSubheader>
                <ListItem key={'title'}>
                  <ListItemText primary={<Typography className={classes.textSuggestionTitle}>{values.title}</Typography>} />
                </ListItem>
                <ListItem key={'description'}>
                  <ListItemText primary={values.description.split('\n').map((i, key) => {
                    return <Typography className={classes.textSuggestion} key={key}>{i}</Typography>;
                  })}
                  />
                </ListItem>
              </ul>
            </li>
            <li
              key={'more'}
              className={classes.listSection}
            >
              <ul className={classes.ul}>
                <ListSubheader>{<FormattedMessage id={'suggestion.stepperContent.more.question'} />}</ListSubheader>
                <ListItem key={'targetedSystem'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.confirmation.targetedSystem' })}</b> {values.targetedSystem}</Typography>} />
                </ListItem>
                <ListItem key={'personDayCurrent'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.confirmation.personDayCurrent' })}</b> {values.personDayCurrent}</Typography>} />
                </ListItem>
                <ListItem key={'personDayFuture'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.confirmation.personDayFuture' })}</b> {values.personDayFuture}</Typography>} />
                </ListItem>
                <ListItem key={'cost'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.confirmation.cost' })}</b> {values.cost} {formatMessage({ id: 'suggestion.stepperContent.more.cost.jpy' })}</Typography>} />
                </ListItem>
              </ul>
            </li>
            <li
              key={'contact'}
              className={classes.listSection}
            >
              <ul className={classes.ul}>
                <ListSubheader>{<FormattedMessage id={'suggestion.stepperContent.contact.question'} />}</ListSubheader>
                <ListItem key={'name'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.contact.name' })}:</b> {values.contributorName}</Typography>} />
                </ListItem>
                <ListItem key={'team'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.contact.team' })}:</b> {values.contributorTeam}</Typography>} />
                </ListItem>
                <ListItem key={'email'}>
                  <ListItemText primary={<Typography className={classes.textSuggestion}><b>{formatMessage({ id: 'suggestion.stepperContent.contact.email' })}:</b> {values.contributorEmail}</Typography>} />
                </ListItem>
              </ul>
            </li>
          </List>
        </div>
        {sendError ? (
          <div className={classes.errorContainer}>
            <Typography className={classes.errorText}>
              <FormattedMessage id={'suggestion.stepperContent.sendError'} />
            </Typography>
          </div>
        ) : null}
        {sending ? (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
            <div className={classes.buttonContainer}>
              <StepperButton
                nextButtonDisabled={false}
                previousButtonDisabled={false}
                nextButtonOnClick={this.props.handleSend}
                previousButtonOnClick={this.props.handleBack}
                nextButtonLabel={
                  <FormattedMessage id={'suggestion.stepper.button.send'} />
                }
                previousButtonLabel={
                  <FormattedMessage id={'suggestion.stepper.button.back'} />
                }
              />
            </div>
        )}
      </div>
    );
  }
}

StepperContentConfirmation.propTypes = {
  classes: PropTypes.object,
  handleSend: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  sendError: PropTypes.bool.isRequired,
  sending: PropTypes.bool.isRequired,
};

export default withStyles(styles)(injectIntl(StepperContentConfirmation));
