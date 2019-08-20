import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography, Button, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined';
import AssignmentIndOutlined from '@material-ui/icons/AssignmentIndOutlined';
import ClassOutlined from '@material-ui/icons/ClassOutlined';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';

import { colors, fontFamily } from '../../../utils/config';
import { datetimeFormatting } from '../../../utils/helper';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: '10px',
  },
  informationContainer: {
  },
  buttonContainer: {
  },
  title: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.title,
    fontSize: '27px',
  },
  secondTitle: {
    color: colors['axa-grey'],
    fontWeight: 500,
    fontFamily: fontFamily.text,
    fontSize: '12px',
  },
  titleContainer: {
    margin: '0 0 10px 0',
  },
  button: {
    color: 'white',
    backgroundColor: colors['axa-red'],
    '&:hover': {
      backgroundColor: colors['axa-red-hover'],
    },
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: 0,
    padding: '7px 15px',
    fontFamily: fontFamily.button,
    width: '80px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: colors['axa-grey'],
    fontWeight: 400,
    fontFamily: fontFamily.text,
    fontSize: '15px',
  },
  icon: {
    color: colors.primary,
  },
  listInformation: {
  },
  listInformationItem: {
    alignItems: 'flex-start',
    padding: '5px 16px',
  },
};

class InformationBox extends Component {
  getCategoryLabel = (category) => {
    const { formatMessage } = this.props.intl;
    if (category !== null && category.substring(0, 5) === 'other') {
      const other = formatMessage({ id: 'suggestion.stepperContent.categories.other' });
      return `${other}: ${category.substring(6)}`;
    } if (!this.props.intl.messages[`suggestion.stepperContent.categories.${category}`]) {
      const other = formatMessage({ id: 'suggestion.stepperContent.categories.other' });
      return `${other}: ${category}`;
    }
    return formatMessage({ id: `suggestion.stepperContent.categories.${category}` });
  }

  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.informationContainer}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title}>{data.title}</Typography>
            <Typography className={classes.secondTitle}>{data.id}</Typography>
          </div>
          <div className={classes.informationTextContainer}>
            <List className={classes.listInformation}>
              <ListItem className={classes.listInformationItem}>
                <ListItemIcon>
                  <AccessTimeOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography className={classes.text}><FormattedMessage id='suggestionList.information.created' /> {datetimeFormatting(data.date)}</Typography>}
                />
              </ListItem>
              <ListItem className={classes.listInformationItem}>
                <ListItemIcon>
                  <AssignmentIndOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography className={classes.text}>{data.contributorName}</Typography>}
                />
              </ListItem>
              <ListItem className={classes.listInformationItem}>
                <ListItemIcon>
                  <ClassOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography className={classes.text}>{this.getCategoryLabel(data.category)}</Typography>}
                />
              </ListItem>
              <ListItem className={classes.listInformationItem}>
                <ListItemIcon>
                  <MonetizationOnOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography className={classes.text}>{data.cost} <FormattedMessage id='suggestion.stepperContent.more.cost.jpy' /></Typography>}
                />
              </ListItem>
            </List>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} to={`/suggestion/${data.id}`} component={Link}><FormattedMessage id="suggestionList.information.button" /></Button>
        </div>
      </div>
    );
  }
}

InformationBox.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};
export default withStyles(styles)(injectIntl(InformationBox));
