export const colors = {
  primary: '#00008f',
  'primary-light': '#502fba',
  'primary-dark': '#00005b',
  secondary: '#4975ba',
  'secondary-light': '#7da3ed',
  'secondary-dark': '#004a8a',
  'blue-light': '#e1f5fe',
  'axa-red': '#f07662',
  'axa-red-hover': '#ec4d33',
  'background-grey': '#F7F7F7',
  'background-grey-dark': '#ECEFF1',
  'axa-grey': '#333333',
};

export const fontFamily = {
  title: '"Publico-Headline", serif',
  text: '"Source-Sans-Pro", sans-serif',
  button: '"Source-Sans-Pro", sans-serif',
  errorText: '"Source-Sans-Pro", sans-serif',
};

export const categoryList = ['efficiency', 'speed', 'quality', 'other']; // Must be in same order than categoriesIcon
export const gatewayStatusList = ['submitted', 'tier1', 'tier2', 'tier3'];
export const approvalStatusList = ['toReview', 'reviewing', 'approved', 'rejected'];
export const sortIdList = [
  {
    id: 'date',
    type: 'datetime',
  },
  {
    id: 'id',
    type: 'number',
  },
  {
    id: 'title',
    type: 'string',
  },
  {
    id: 'contributorName',
    type: 'string',
  },
  {
    id: 'contributorTeam',
    type: 'string',
  },
  {
    id: 'category',
    type: 'string',
  },
  {
    id: 'cost',
    type: 'number',
  },
  {
    id: 'gatewayStatus',
    type: 'string',
  },
  {
    id: 'approvalStatus',
    type: 'string',
  },
  {
    id: 'editDate',
    type: 'datetime',
  },
];
