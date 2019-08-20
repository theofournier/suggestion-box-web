import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import { FormattedMessage, injectIntl } from 'react-intl';

import MaterialTable from 'material-table';
import axios from 'axios';
import { categoryList, gatewayStatusList, approvalStatusList } from '../../utils/config';
import { datetimeFormatting } from '../../utils/helper';
import MySnackbarContent from '../elements/MySnackbarContent';
import MoreInformationPanel from './MoreInformationPanel';
import EditInformationPanel from './EditInformationPanel';
import HistoryPanel from './HistoryPanel';


const maxLength = 50;

class SuggestionTable extends Component {
  state = {
    suggestions: [],
    errorSave: false,
    snackbarOpen: false,
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
        });
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

  otherCategoryLabel = (rowData) => {
    const { formatMessage } = this.props.intl;
    if (rowData.category !== null && rowData.category.substring(0, 5) === 'other') {
      const other = formatMessage({ id: 'suggestion.stepperContent.categories.other' });
      return <div>{other}: {rowData.category.substring(6)}</div>;
    } if (!this.props.intl.messages[`suggestion.stepperContent.categories.${rowData.category}`]) {
      const other = formatMessage({ id: 'suggestion.stepperContent.categories.other' });
      return <div>{other}: {rowData.category}</div>;
    }
    return rowData.category;
  }

  lookupConstructor = (list, formattedMessageBase) => {
    const lookup = {};
    list.forEach((element) => {
      lookup[element] = this.props.intl.formatMessage({ id: `${formattedMessageBase}.${element}` });
    });
    return lookup;
  }

  reduceDisplayLabel = (label) => {
    if (label !== null && label !== undefined && label.length > maxLength) {
      return `${label.substring(0, maxLength)}...`;
    }
    return label;
  }

  render() {
    const {
      suggestions, snackbarOpen,
    } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Paper style={{ height: '85vh', width: '100%' }}>
          <MaterialTable
            columns={[
              {
                title: formatMessage({ id: 'admin.table.header.id' }),
                field: 'id',
                type: 'numeric',
                defaultSort: 'desc',
              },
              {
                title: formatMessage({ id: 'admin.table.header.date' }),
                field: 'date',
                type: 'date',
                render: (rowData) => datetimeFormatting(rowData.date),
              },
              { title: formatMessage({ id: 'admin.table.header.contributorName' }), field: 'contributorName', type: 'string' },
              {
                title: formatMessage({ id: 'admin.table.header.category' }),
                field: 'category',
                type: 'string',
                lookup: this.lookupConstructor(categoryList, 'suggestion.stepperContent.categories'),
                emptyValue: this.otherCategoryLabel,
              },
              {
                title: formatMessage({ id: 'admin.table.header.title' }),
                field: 'title',
                type: 'string',
              },
              {
                title: formatMessage({ id: 'admin.table.header.cost' }),
                field: 'cost',
                type: 'currency',
                currencySetting: {
                  locale: 'jp-JP',
                  currencyCode: 'JPY',
                },
                emptyValue: formatMessage({ id: 'admin.table.NA' }),
              },
              {
                title: formatMessage({ id: 'admin.table.header.gatewayStatus' }),
                field: 'gatewayStatus',
                type: 'string',
                lookup: this.lookupConstructor(gatewayStatusList, 'admin.gatewayStatus'),
                emptyValue: (rowData) => rowData.gatewayStatus,
              },
              {
                title: formatMessage({ id: 'admin.table.header.approvalStatus' }),
                field: 'approvalStatus',
                type: 'string',
                lookup: this.lookupConstructor(approvalStatusList, 'admin.approvalStatus'),
                emptyValue: (rowData) => rowData.approvalStatus,
              },
              {
                title: formatMessage({ id: 'admin.table.header.description' }),
                field: 'description',
                type: 'string',
                render: (rowData) => this.reduceDisplayLabel(rowData.description),
                hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.contributorEmail' }), field: 'contributorEmail', type: 'string', hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.contributorTeam' }), field: 'contributorTeam', type: 'string', hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.targetedSystem' }), field: 'targetedSystem', type: 'string', hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.personDayCurrent' }), field: 'personDayCurrent', type: 'numeric', hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.personDayFuture' }), field: 'personDayFuture', type: 'numeric', hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.remark' }),
                field: 'remark',
                type: 'string',
                render: (rowData) => this.reduceDisplayLabel(rowData.remark),
                hidden: true,
              },
              {
                title: formatMessage({ id: 'admin.table.header.editDate' }),
                field: 'editDate',
                type: 'datetime',
                render: (rowData) => datetimeFormatting(rowData.editDate),
                hidden: true,
              },
            ]}
            data={suggestions}
            title={formatMessage({ id: 'admin.table.title' })}
            onRowClick={(e, rowData, togglePanel) => togglePanel(0)}
            detailPanel={[
              {
                tooltip: <FormattedMessage id='admin.moreInformationPanel.tooltip' />,
                render: (rowData) => {
                  return (
                    <MoreInformationPanel suggestionSelected={rowData} />
                  );
                },
              },
              {
                tooltip: <FormattedMessage id='admin.editInformationPanel.tooltip' />,
                icon: 'edit',
                render: (rowData) => {
                  return (
                    <EditInformationPanel
                      suggestionSelected={rowData}
                      fetchData={this.fetchData}
                      handleOpenSnackbar={this.handleOpenSnackbar}
                    />
                  );
                },
              },
              {
                tooltip: <FormattedMessage id='admin.historyPanel.tooltip' />,
                icon: 'history',
                render: (rowData) => {
                  return (
                    <HistoryPanel
                      suggestionSelected={rowData}
                    />
                  );
                },
              },
            ]}
            options={{
              paging: true,
              pageSize: 5,
              columnsButton: true,
              exportButton: true,
              showEmptyDataSourceMessage: true,
              emptyRowsWhenPaging: true,
              headerStyle: {
                boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.5)',
                color: 'black',
                fontSize: 14,
              },
              rowStyle: {
                opacity: 0.90,
              },
            }}
            localization={{
              body: {
                emptyDataSourceMessage: formatMessage({ id: 'admin.table.emptyData' }),
              },
            }}
          />
        </Paper >
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


SuggestionTable.propTypes = {
  classes: PropTypes.object,
};

export default injectIntl(SuggestionTable);
