import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { injectIntl } from 'react-intl';
import { datetimeFormatting } from '../../utils/helper';

const styles = () => ({
  card: {
    minWidth: 250,
    marginEnd: '20px',
  },
  title: {
    fontSize: 15,
    marginTop: '15px',
  },
  adminText: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: '15px',
  },
  editText: {
    fontSize: 12,
  },
});


class HistoryCard extends Component {
  cleanerType = (type) => {
    const { intl } = this.props;
    if (intl.messages[`historyCard.${type}`]) {
      return intl.formatMessage({ id: `historyCard.${type}` });
    }
    return type;
  }

  getHistoryLabel = (str, type) => {
    const { intl } = this.props;
    let label = '';
    switch (type) {
      case 'approvalStatus':
        if (intl.messages[`admin.approvalStatus.${str}`]) {
          label = intl.formatMessage({ id: `admin.approvalStatus.${str}` });
        } else {
          label = str;
        }
        break;
      case 'gatewayStatus':
        if (intl.messages[`admin.gatewayStatus.${str}`]) {
          label = intl.formatMessage({ id: `admin.gatewayStatus.${str}` });
        } else {
          label = str;
        }
        break;
      case 'category':
        if (str.substring(0, 5) === 'other') {
          const other = intl.formatMessage({ id: 'suggestion.stepperContent.categories.other' });
          label = `${other}: ${str.substring(6)}`;
        } if (!this.props.intl.messages[`suggestion.stepperContent.categories.${str}`]) {
          const other = intl.formatMessage({ id: 'suggestion.stepperContent.categories.other' });
          label = `${other}: ${str}`;
        }
        break;
      case 'remark':
      default:
        label = str;
        break;
    }
    return label;
  }

  editDisplay = (edit) => {
    try {
      const editJson = JSON.parse(edit);
      const { intl } = this.props;
      const html = [];
      let type;
      const count = Object.keys(editJson).length;
      for (let i = 0; i < count; i++) {
        type = Object.keys(editJson)[i];
        const labelPast = this.getHistoryLabel(editJson[Object.keys(editJson)[i]].past, type);
        const labelNow = this.getHistoryLabel(editJson[Object.keys(editJson)[i]].now, type);
        type = this.cleanerType(type);
        html.push(<p key={i}><b>{type}</b>:<br /> {labelPast} <b>{intl.formatMessage({ id: 'historyCard.to' })}</b> {labelNow}</p>);
      }
      return html;
    } catch {
      return null;
    }
  }

  render() {
    const { classes, data } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="inherit" className={classes.title}>
            {datetimeFormatting(data.date)}
          </Typography>
          <Typography color="inherit" className={classes.adminText}>
            {data.adminId}
          </Typography>
          <div className={classes.editText}>
            {this.editDisplay(data.modification)}
          </div>

        </CardContent>
      </Card>
    );
  }
}

HistoryCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};

export default withStyles(styles)(injectIntl(HistoryCard));
