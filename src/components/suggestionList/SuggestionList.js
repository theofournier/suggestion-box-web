import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

import { colors, fontFamily, sortIdList } from '../../utils/config';
import { isEmpty } from '../../utils/helper';

import SuggestionItem from './suggestionItem/SuggestionItem';
import MySnackbarContent from '../elements/MySnackbarContent';
import SuggestionFilter from './SuggestionFilter';

const styles = {
  root: {
    padding: '20px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '87vh',
    backgroundColor: colors['background-grey'],
  },
  title: {
    color: colors['axa-grey'],
    fontWeight: 600,
    fontFamily: fontFamily.title,
    fontSize: '35px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    margin: '0 0 20px 0',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: '20px',
  },
  listContainer: {
    maxHeight: '100%',
    overflow: 'auto',
    maxWidth: '1100px',
    alignSelf: 'center',
  },
  list: {
    padding: '0 1%',
  },
  filterContainer: {
    marginStart: '20px',
  },
};

class SuggestionList extends Component {
  state = {
    suggestions: [],
    suggestionsSearch: [],
    snackbarOpen: false,
    sortId: 'id',
    sortAsc: false,
    searchValue: '',
  };

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('/api/suggestion')
      .then((res) => {
        this.setState({
          suggestions: res.data,
          suggestionsSearch: [...res.data],
        }, () => this.sortSuggestions());
      })
      .catch((err) => {

      });
  }

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value }, () => this.searchSuggestions());
  };

  handleSort = (e) => {
    this.setState({ sortId: e.target.value }, () => this.sortSuggestions());
  };

  handleSortOrder = (sortAsc) => {
    this.setState({ sortAsc }, () => this.sortSuggestions());
  };

  getSortObject = (id) => {
    for (let i = 0; i < sortIdList.length; i++) {
      if (sortIdList[i].id === id) {
        return sortIdList[i];
      }
    }
    return false;
  }

  sortSuggestions = () => {
    const { suggestionsSearch, sortId, sortAsc } = this.state;

    const sortObject = this.getSortObject(sortId);
    if (sortObject) {
      switch (sortObject.type) {
        case 'number':
          suggestionsSearch.sort((a, b) => {
            if (sortAsc) { return a[sortId] - b[sortId]; }
            return b[sortId] - a[sortId];
          });
          break;
        case 'datetime':
          suggestionsSearch.sort((a, b) => {
            if (sortAsc) { return new Date(a[sortId]) - new Date(b[sortId]); }
            return new Date(b[sortId]) - new Date(a[sortId]);
          });
          break;
        case 'string':
        default:
          suggestionsSearch.sort((a, b) => {
            if (sortAsc) { return a[sortId].toLowerCase().localeCompare(b[sortId].toLowerCase()); }
            return b[sortId].toLowerCase().localeCompare(a[sortId].toLowerCase());
          });
          break;
      }
      this.setState({ suggestionsSearch });
    }
  }

  checkInclude = (suggestion, searchValue) => {
    for (const k in suggestion) {
      if (!isEmpty(suggestion[k]) && suggestion[k].toString().toLowerCase().includes(searchValue.toLowerCase())) {
        return suggestion;
      }
    }
    return false;
  }

  searchSuggestions = () => {
    const { suggestions, searchValue } = this.state;

    let suggestionsSearch = [];
    if (searchValue !== '') {
      suggestionsSearch = suggestions.filter((suggestion) => this.checkInclude(suggestion, searchValue));
    } else {
      suggestionsSearch = suggestions;
    }

    this.setState({ suggestionsSearch }, () => this.sortSuggestions());
  }

  render() {
    const { classes } = this.props;
    const {
      suggestionsSearch,
      snackbarOpen,
      sortId,
      sortAsc,
      searchValue,
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.headerContainer}>
            <div className={classes.titleContainer}>
              <Typography className={classes.title}><FormattedMessage id="suggestionList.title" /></Typography>
            </div>
            <div className={classes.filterContainer}>
              <SuggestionFilter
                sortSuggestions={this.sortSuggestions}
                searchSuggestions={this.searchSuggestions}
                sortId={sortId}
                sortAsc={sortAsc}
                searchValue={searchValue}
                handleSearch={this.handleSearch}
                handleSort={this.handleSort}
                handleSortOrder={this.handleSortOrder}
              />
            </div>
          </div>
          <div className={classes.listContainer}>
            {suggestionsSearch && suggestionsSearch.length > 0
              ? <List className={classes.list}>
                {suggestionsSearch.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion.id}
                    data={suggestion}
                    fetchData={this.fetchData}
                    handleOpenSnackbar={this.handleOpenSnackbar} />
                ))}
              </List>
              : <Typography><FormattedMessage id={'suggestionList.noSuggestions'} /></Typography>}
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <MySnackbarContent
            onClose={this.handleCloseSnackbar}
            variant="success"
            message={<FormattedMessage id={'admin.successSave'} />}
          />
        </Snackbar>
      </div>
    );
  }
}

SuggestionList.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(SuggestionList);
