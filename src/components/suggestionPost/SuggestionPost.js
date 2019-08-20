import React, { Component } from 'react';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import HorizontalStepper from './HorizontalStepper';
import StepperContentCategories from './StepperContentCategories';
import StepperContentDescription from './StepperContentDescription';
import StepperContentMore from './StepperContentMore';
import StepperContentContact from './StepperContentContact';
import StepperContentConfirmation from './StepperContentConfirmation';

import ThankYou from './ThankYou';

const styles = {
  root: {
    marginTop: '10px',
    marginBottom: '20px',
  },
};

class SuggestionPost extends Component {
  state = {
    activeStep: 0,
    category: {
      id: '', label: '', iconLabel: '', text: '',
    },
    title: '',
    description: '',
    targetedSystem: '',
    personDayCurrent: '',
    personDayFuture: '',
    cost: '',
    contributorName: '',
    contributorTeam: '',
    contributorEmail: '',
    sendError: false,
    sending: false,
  };

  /* state = {
    activeStep: 4,
    category: {
      id: 'speed', label: 'Speed/Time to market', iconLabel: 'calendar-alt', text: undefined,
    },
    title: 'Test title test ete fsaf',
    description: 'Test description\nMultiple line\nThird Line',
    targetedSystem: 'Integration services',
    personDayCurrent: 4,
    personDayFuture: 10,
    cost: 1000000,
    contributorName: 'John Doe',
    contributorTeam: 'DevOps',
    contributorEmail: 'johndoe@axa.co.jp',
    sendError: false,
    sending: false,
  }; */

  getSteps = () => {
    return [
      <FormattedMessage id={'suggestion.stepper.steps.categories'} />,
      <FormattedMessage id={'suggestion.stepper.steps.description'} />,
      <FormattedMessage id={'suggestion.stepper.steps.more'} />,
      <FormattedMessage id={'suggestion.stepper.steps.contact'} />,
      <FormattedMessage id={'suggestion.stepper.steps.confirmation'} />,
    ];
  };

  getStepContent = (stepIndex) => {
    const {
      category,
      title,
      description,
      targetedSystem,
      personDayCurrent,
      personDayFuture,
      cost,
      contributorName,
      contributorTeam,
      contributorEmail,
    } = this.state;
    const values = {
      category,
      title,
      description,
      targetedSystem,
      personDayCurrent,
      personDayFuture,
      cost,
      contributorName,
      contributorTeam,
      contributorEmail,
    };

    switch (stepIndex) {
      case 0:
        return (
          <StepperContentCategories
            handleNext={this.handleNext}
            handleCancel={this.handleCancel}
            values={values}
            updateState={this.updateState}
          />
        );
      case 1:
        return (
          <StepperContentDescription
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            values={values}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <StepperContentMore
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            values={values}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <StepperContentContact
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            values={values}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <StepperContentConfirmation
            handleSend={this.handleSend}
            handleBack={this.handleBack}
            values={values}
            sendError={this.state.sendError}
            sending={this.state.sending}
          />
        );
      case 5:
        return <ThankYou
          resetStepper={this.resetStepper}
        />;
      default:
        return <FormattedMessage id={'suggestion.stepper.steps.unknown'} />;
    }
  };

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleCancel = () => {
    this.props.history.push('/');
  };

  handleSend = () => {
    this.setState({
      sending: true,
    });

    const cat = this.state.category.id === 'other'
      ? `${this.state.category.id} ${this.state.category.text}`
      : this.state.category.id;
    const suggestion = {
      contributorName: this.state.contributorName,
      contributorEmail: this.state.contributorEmail,
      contributorTeam: this.state.contributorTeam,
      category: cat,
      targetedSystem: this.state.targetedSystem,
      title: this.state.title,
      description: this.state.description,
      personDayCurrent: this.state.personDayCurrent === '' ? undefined : this.state.personDayCurrent,
      personDayFuture: this.state.personDayFuture === '' ? undefined : this.state.personDayFuture,
      cost: this.state.cost === '' ? undefined : this.state.cost,
      gatewayStatus: 'submitted',
      approvalStatus: 'toReview',
    };

    axios
      .post('/api/suggestion', suggestion, {
        params: {
          email: 1,
        },
      })
      .then((res) => {
        this.setState((state) => ({
          activeStep: state.activeStep + 1,
          sending: false,
        }));
      })
      .catch((err) => {
        this.setState({
          sendError: true,
          sending: false,
        });
      });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  updateState = (input, value) => {
    this.setState({ [input]: value });
  };

  resetStepper = () => {
    this.setState({
      activeStep: 0,
      category: {
        id: '', label: '', iconLabel: '', text: '',
      },
      title: '',
      description: '',
      targetedSystem: '',
      personDayCurrent: '',
      personDayFuture: '',
      cost: '',
      contributorName: '',
      contributorTeam: '',
      contributorEmail: '',
      sendError: false,
      sending: false,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.activeStep === this.getSteps().length ? null : (
          <HorizontalStepper
            getSteps={this.getSteps}
            activeStep={this.state.activeStep}
          />
        )}
        {this.getStepContent(this.state.activeStep)}
      </div>
    );
  }
}


SuggestionPost.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SuggestionPost);
