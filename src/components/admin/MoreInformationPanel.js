import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { colors, fontFamily } from '../../utils/config';
import { datetimeFormatting } from '../../utils/helper';

const styles = {
  root: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    alignItems: 'center',
    backgroundColor: colors['background-grey'],
  },
  textContainer: {
    marginTop: '10px',
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily: fontFamily.text,
  },
  text: {
    fontSize: 18,
    fontFamily: fontFamily.text,
  },
  descriptionField: {
    minWidth: 400,
  },
};

class MoreInformationPanel extends Component {
  state = {
    suggestionSelected: {
      id: '',
      date: '',
      category: '',
      description: '',
      targetedSystem: '',
      personDayCurrent: '',
      personDayFuture: '',
      cost: '',
      contributorName: '',
      contributorTeam: '',
      contributorEmail: '',
      gatewayStatus: '',
      approvalStatus: '',
      remark: '',
      editDate: '',
    },
    errorSave: false,
  }

  componentDidMount = () => {
    this.setState({ suggestionSelected: this.props.suggestionSelected });
  }

  render() {
    const { classes } = this.props;
    const { suggestionSelected } = this.state;
    return (
      <div className={classes.root}>
        <div>
          <Typography className={classes.label}>
            <FormattedMessage
              id={'admin.dialog.description'}
            />
          </Typography>
          <TextField
            id="filled-description"
            multiline
            InputProps={{
              readOnly: true,
            }}
            rowsMax="8"
            value={suggestionSelected.description}
            margin="normal"
            variant="outlined"
            name="description"
            className={classes.descriptionField}
          />
        </div>
        <div>
          <div>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.targetedSystem'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.targetedSystem}
            </Typography>
          </div>
          <div className={classes.textContainer}>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.personDayCurrent'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.personDayCurrent}
            </Typography>
          </div>
          <div className={classes.textContainer}>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.personDayFuture'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.personDayFuture}
            </Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.contributorName'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.contributorName}
            </Typography>
          </div>
          <div className={classes.textContainer}>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.contributorEmail'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.contributorEmail}
            </Typography>
          </div>
          <div className={classes.textContainer}>
            <Typography className={classes.label}>
              <FormattedMessage
                id={'admin.dialog.contributorTeam'}
              />
            </Typography>
            <Typography className={classes.text}>
              {suggestionSelected.contributorTeam}
            </Typography>
          </div>
        </div>
        <div>
          <Typography className={classes.label}>
            <FormattedMessage
              id={'admin.dialog.editDate'}
            />
          </Typography>
          <Typography className={classes.text}>
            {datetimeFormatting(suggestionSelected.editDate)}
          </Typography>
        </div>
      </div>
    );
  }
}

MoreInformationPanel.propTypes = {
  classes: PropTypes.object,
  suggestionSelected: PropTypes.object,
};

export default withStyles(styles)(MoreInformationPanel);
