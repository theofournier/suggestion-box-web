
import moment from 'moment';

export function ArrayOfObjectToArrayOfArray(datas) {
  const array = [];
  datas.forEach((data) => {
    array.push(Object.values(data));
  });
  return array;
}

export function datetimeFormatting(date) {
  return date !== null ? moment(date).format('YYYY/MM/DD HH:mm') : null;
}

export function intToString(int) {
  return int === undefined || int === null ? null : int.toString();
}

export function isEmpty(value) {
  return value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0);
}

export function isNumber(value) {
  return /^\d+$/.test(value);
}

export function isDecimal(value) {
  if (!value.includes('.')) return isNumber(value);
  return /^[-+]?[0-9]+\.[0-9]+$/.test(value);
}

export function isEmail(value) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
}
