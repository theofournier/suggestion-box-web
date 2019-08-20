import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import StarsOutlined from '@material-ui/icons/StarsOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ClassOutlined from '@material-ui/icons/ClassOutlined';
import { FormattedMessage } from 'react-intl';
import { colors, fontFamily } from '../../utils/config';

const styles = {
  icon: {
    color: colors.primary,
    fontSize: 70,
  },
  radio: {
    color: 'default',
    '&$checked': {
      color: colors['secondary-light'],
    },
  },
  checked: {},
  card: {
    width: 200,
    margin: '15px',
    cursor: 'pointer',
  },
  label: {
    fontSize: 18,
    marginTop: '15px',
    fontWeight: 500,
    fontFamily: fontFamily.text,
    lineHeight: '24px',
    color: colors['axa-grey'],
  },
  errorText: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: fontFamily.errorText,
    color: 'red',
  },
};

class CategoryCard extends Component {
  getIcon = (id, classes) => {
    switch (id) {
      case 'efficiency':
        return <GroupOutlined className={classes.icon} />;
      case 'speed':
        return <CalendarTodayOutlined className={classes.icon} />;
      case 'quality':
        return <StarsOutlined className={classes.icon} />;
      case 'other':
        return <EditOutlined className={classes.icon} />;
      default:
        return <ClassOutlined className={classes.icon} />;
    }
  }


  render() {
    const {
      classes,
      category,
      handleRadio,
      selectedCategory,
      handleChangeOther,
      otherTextError,
      onClickCard,
    } = this.props;
    return (
      <Card className={classes.card} onClick={() => onClickCard(category.id)}>
        <CardActions>
          <Radio
            checked={category.id === selectedCategory.id}
            onChange={handleRadio}
            value={category.id}
            classes={{
              root: classes.radio,
              checked: classes.checked,
            }}
          />
        </CardActions>
        <CardContent>
          {this.getIcon(category.id, classes)}
          <Typography className={classes.label}>
            {category.label}
          </Typography>
          {category.id === 'other' ? (
            <FormControl error>
              <TextField
                disabled={selectedCategory.id !== 'other'}
                error={otherTextError}
                id="filled-other"
                value={selectedCategory.text}
                onChange={handleChangeOther}
                margin="normal"
                variant="outlined"
                multiline
                label={category.label}
              />
              {otherTextError ? (
                <Typography className={classes.errorText} id="component-error-text">
                  <FormattedMessage
                    id={'suggestion.stepperContent.requiredLabel'}
                  />
                </Typography>
              ) : null}
            </FormControl>
          ) : null}
        </CardContent>
      </Card>
    );
  }
}
CategoryCard.propTypes = {
  classes: PropTypes.object,
  category: PropTypes.object.isRequired,
  handleRadio: PropTypes.func.isRequired,
  selectedCategory: PropTypes.object.isRequired,
  handleChangeOther: PropTypes.func,
  otherTextError: PropTypes.bool,
  onClickCard: PropTypes.func,
};
export default withStyles(styles)(CategoryCard);
