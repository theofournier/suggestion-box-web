import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { FormattedMessage } from 'react-intl';
import { FormControl } from '@material-ui/core';
import ClassOutlined from '@material-ui/icons/ClassOutlined';
import StepperButton from './StepperButton';
import { colors, categoryList, fontFamily } from '../../utils/config';
import { isEmpty } from '../../utils/helper';
import CategoryCard from './CategoryCard';

const styles = {
  icon: {
    color: colors.primary,
    fontSize: 70,
  },
  root: {
    textAlign: 'center',
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
  gridContainer: {
    marginTop: '50px',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    width: '850px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: '50px',
    alignContent: 'center',
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
    alignSelf: 'left',
  },
};

class StepperContentCategories extends Component {
  state = {
    categories: [],
    selectedCategory: {
      id: undefined, label: undefined, text: undefined,
    },
    otherTextError: false,
    noSelectedError: false,
  };

  componentDidMount = () => {
    const { values } = this.props;
    this.categoriesInit();
    this.setState({ selectedCategory: values.category });
  };

  categoriesInit = () => {
    const categories = [];
    for (let index = 0; index < categoryList.length; index++) {
      const category = categoryList[index];
      categories.push({
        id: category,
        label: (
          <FormattedMessage
            id={`suggestion.stepperContent.categories.${category}`}
          />
        ),
        text: '',
      });
    }
    this.setState({ categories });
  }

  inputsValidation = () => {
    let valid = true;
    if (
      this.state.selectedCategory.id === 'other'
      && (isEmpty(this.state.selectedCategory.text))
    ) {
      this.setState({
        otherTextError: true,
      });
      valid = false;
    } else {
      this.setState({
        otherTextError: false,
      });
    }

    if (isEmpty(this.state.selectedCategory.id)) {
      this.setState({
        noSelectedError: true,
      });
      valid = false;
    } else {
      this.setState({
        noSelectedError: false,
      });
    }

    return valid;
  };

  getCategory = (id) => {
    let cat = {};
    this.state.categories.forEach((category) => {
      if (category.id === id) cat = category;
    });
    return cat;
  };

  handleRadio = (e) => {
    if (this.state.selectedCategory.id !== e.target.value) {
      const selectedCategory = this.getCategory(e.target.value);
      this.setState({
        selectedCategory,
      });
    }
  };

  onClickCard = (id) => {
    const e = {};
    e.target = {};
    e.target.value = id;
    this.handleRadio(e);
  };

  handleChangeOther = (e) => {
    this.setState({
      selectedCategory: {
        ...this.state.selectedCategory,
        text: e.target.value,
      },
    });
  };

  handleNext = () => {
    if (this.inputsValidation()) {
      this.props.updateState('category', this.state.selectedCategory);
      this.props.handleNext();
    }
  };

  render() {
    const { classes } = this.props;
    const {
      categories,
      selectedCategory,
      otherTextError,
      noSelectedError,
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>
            <FormattedMessage
              id={'suggestion.stepperContent.categories.question'}
            />
          </Typography>
          <ClassOutlined className={classes.icon} />
        </div>
        <FormControl className={classes.gridContainer}>
          <GridList className={classes.gridList} cols={4}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                handleRadio={this.handleRadio}
                selectedCategory={selectedCategory}
                handleChangeOther={this.handleChangeOther}
                otherTextError={otherTextError}
                onClickCard={this.onClickCard}
              />
            ))}
          </GridList>
          {noSelectedError ? (
            <Typography className={classes.errorText}>
              <FormattedMessage
                id={'suggestion.stepperContent.requiredLabel'}
              />
            </Typography>
          ) : null}
        </FormControl>
        <div className={classes.buttonContainer}>
          <Typography className={classes.required}><FormattedMessage id={'suggestion.stepperContent.required'} /></Typography>
          <StepperButton
            nextButtonDisabled={false}
            previousButtonDisabled={false}
            nextButtonOnClick={this.handleNext}
            previousButtonOnClick={this.props.handleCancel}
            nextButtonLabel={
              <FormattedMessage id={'suggestion.stepper.button.next'} />
            }
            previousButtonLabel={
              <FormattedMessage id={'suggestion.stepper.button.cancel'} />
            }
          />
        </div>
      </div>
    );
  }
}

StepperContentCategories.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  updateState: PropTypes.func,
};

export default withStyles(styles)(StepperContentCategories);
