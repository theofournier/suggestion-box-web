import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import {
  Typography, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';

import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined';
import AssignmentIndOutlined from '@material-ui/icons/AssignmentIndOutlined';
import ClassOutlined from '@material-ui/icons/ClassOutlined';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';
import EditInformations from './EditInformations';
import { datetimeFormatting } from '../../utils/helper';
import {
  fontFamily,
} from '../../utils/config';

const styles = () => ({
  root: {
    marginTop: 30,
    minWidth: 300,
    width: '100%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },
  infoLeftContainer: {
    flexGrow: 1,
    flexBasis: '50%',

  },
  infoRightContainer: {
    flexGrow: 1,
    flexBasis: '50%',

  },
  editContainer: {

  },
  title: {
    fontSize: 15,
  },
  categories: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: fontFamily.text,
  },
  person: {
    marginBottom: 8,
    fontSize: 15,
    fontStyle: 'italic',
    fontFamily: fontFamily.text,
  },
  contact: {
    fontFamily: fontFamily.text,
    marginBottom: 10,
    fontSize: 18,
  },
  icon: {

  },
  listInformation: {
  },
  listInformationItem: {
    alignItems: 'flex-start',
    padding: '5px 16px',
  },
});

class Informations extends Component {
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
    const { classes, suggestion, intl } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.infoContainer}>
          <div className={classes.infoLeftContainer}>

            <ListItem className={classes.listInformationItem}>
              <ListItemIcon>
                <AccessTimeOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.categories}>{intl.formatMessage({ id: 'suggestion.created' })} {datetimeFormatting(suggestion.date)}</Typography>}
              />
            </ListItem>
            <ListItem className={classes.listInformationItem}>
              <ListItemIcon>
                <ClassOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.categories}>{this.getCategoryLabel(suggestion.category)}</Typography>}
              />
            </ListItem>
            <ListItem className={classes.listInformationItem}>
              <ListItemIcon>
                <MonetizationOnOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.categories}>{suggestion.cost} {intl.formatMessage({ id: 'suggestion.jpy' })}</Typography>}
              />
            </ListItem>
            <Typography variant="h4" className={classes.categories}>
              <b>{intl.formatMessage({ id: 'suggestion.targetedSystem' })} : </b>{suggestion.targetedSystem}
            </Typography>
            <Typography variant="h4" className={classes.person}>
              {intl.formatMessage({ id: 'suggestion.personDayCurrent' })} : {suggestion.personDayCurrent}
            </Typography>
            <Typography variant="h4" className={classes.person}>
              {intl.formatMessage({ id: 'suggestion.personDayFuture' })} : {suggestion.personDayFuture}
            </Typography>
          </div>
          <div className={classes.infoLeftContainer}>
            <ListItem className={classes.listInformationItem}>
              <ListItemIcon>
                <AssignmentIndOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h4" className={classes.contact}>
                    {suggestion.contributorName}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem className={classes.listInformationItem}>
              <ListItemText
                primary={
                  <Typography variant="h4" className={classes.contact}>
                    {suggestion.contributorEmail}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem className={classes.listInformationItem}>
              <ListItemText
                primary={
                  <Typography variant="h4" className={classes.contact}>
                    {suggestion.contributorTeam}
                  </Typography>
                }
              />
            </ListItem>
          </div>
        </div>
        <EditInformations
          suggestion={suggestion}
          updatePage={this.props.updatePage}
        />
      </div>
    );
  }
}

Informations.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestion: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(Informations));
