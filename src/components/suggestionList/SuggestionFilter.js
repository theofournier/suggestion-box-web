import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TextField, InputAdornment, IconButton, Typography, FormControl, Select, MenuItem, Tooltip,
} from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import { FormattedMessage } from 'react-intl';

import { colors, fontFamily, sortIdList } from '../../utils/config';

const styles = {
  root: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarContainer: {
    margin: '0 20px 0 0',
  },
  sortContainer: {
  },
  sortTitleContainer: {
    margin: '0 0 5px 0',
  },
  sortActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'reverseWrap',
    alignItems: 'center',
  },
  sortGroupContainer: {
    margin: '0 10px 0 0',
  },
  sortButtonContainer: {
  },
  title: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.title,
    fontSize: 20,
  },
  text: {
    fontSize: 14,
    color: colors['axa-grey'],
    fontWeight: 400,
    fontFamily: fontFamily.text,
  },
  icon: {
    color: colors.primary,
  },
};

class SuggestionFilter extends Component {
  render() {
    const {
      classes,
      sortId,
      sortAsc,
      searchValue,
      searchSuggestions,
      handleSearch,
      handleSort,
      handleSortOrder,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.searchBarContainer}>
          <TextField
            variant='outlined'
            name='searchValue'
            value={searchValue}
            onChange={handleSearch}
            label={<FormattedMessage id='suggestionList.filter.search' />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={searchSuggestions}>
                    <SearchOutlined className={classes.icon} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.sortContainer}>
          <div className={classes.sortTitleContainer}>
            <Typography className={classes.title}>
              <FormattedMessage id='suggestionList.filter.sortTitle' />
            </Typography>
          </div>
          <div className={classes.sortActionContainer}>
            <div className={classes.sortGroupContainer}>
              <FormControl>
                <Select
                  value={sortId}
                  onChange={handleSort}
                  name="sortId"
                >
                  {sortIdList.map((sortIdTemp) => (
                    <MenuItem value={sortIdTemp.id} key={sortIdTemp.id}><FormattedMessage id={`suggestionList.filter.sort.${sortIdTemp.id}`} /></MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.sortButtonContainer}>
              {sortAsc
                ? <Tooltip title={<FormattedMessage id='suggestionList.filter.sort.asc' />}>
                  <IconButton onClick={() => handleSortOrder(false)}>
                    <ArrowUpwardOutlined className={classes.icon} />
                  </IconButton>
                </Tooltip>
                : <Tooltip title={<FormattedMessage id='suggestionList.filter.sort.desc' />}>
                  <IconButton onClick={() => handleSortOrder(true)}>
                    <ArrowDownwardOutlined className={classes.icon} />
                  </IconButton>
                </Tooltip>
              }
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

SuggestionFilter.propTypes = {
  classes: PropTypes.object,
  sortId: PropTypes.string,
  sortAsc: PropTypes.bool,
  searchValue: PropTypes.string,
  searchSuggestions: PropTypes.func,
  sortSuggestions: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSort: PropTypes.func,
  handleSortOrder: PropTypes.func,
};
export default withStyles(styles)(SuggestionFilter);
