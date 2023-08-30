/* eslint-disable consistent-return */
// import regex from 'constants/regex';
import moment from 'moment';
import Constants from './Constants';

export const getUTCStringNow = () => moment().toDate().toISOString();

export const getDate = () => moment().toDate();

export const getDateFormat = (toFormat = 'YYYY/MM/DD') =>
  moment().local().format(toFormat);

export const formatTimestamp = (timestamp, toFormat = 'YYYY/MM/DD') => {
  if (timestamp) {
    return moment(timestamp).format(toFormat);
  }

  return '';
};

export const formatDate = (date, toFormat = 'YYYY/MM/DD') => {
  if (date) {
    return moment(date).format(toFormat);
  }

  return '';
};

export const convertDateStringToDate = (dateStr, format = 'DD/MM/YYYY') => {
  if (dateStr) {
    return moment(dateStr, format).format('YYYY-MM-DD');
  }
  return '';
}

export const formatTime = (time, toFormat = 'HH:mm') => {
  if (time) {
    return moment(time).format(toFormat);
  }
  return '';
};

export const formatFromTime = (
  time,
  fromFormat = 'HH:mm',
  toFormat = 'HH:mm',
) => {
  if (time) {
    return moment(time, fromFormat).format(toFormat);
  }

  return '';
};

export const formatToDate = (date, fromFormat = 'YYYY/MM/DD') => {
  if (date) {
    return moment(date, fromFormat).toDate();
  }

  return null;
};

export const formatToDateTime = (date, fromFormat = 'YYYY/MM/DD HH:mm') => {
  if (date) {
    return moment(date, fromFormat).toDate();
  }

  return null;
};

export const formatToDateOnly = (date, fromFormat = 'YYYY/MM/DD') => {
  if (date) {
    return moment(date, fromFormat).startOf('day').toDate();
  }

  return null;
};

export const diffYears = (
  fromDate,
  toDate = getUTCStringNow(),
  fromFormat = 'YYYY',
) => {
  if (fromDate && toDate) {
    const dateEnd = moment(toDate).format(fromFormat);
    const dateStart = moment(fromDate).format(fromFormat);
    const years = moment(dateEnd, fromFormat).diff(
      moment(dateStart, fromFormat),
      'years',
    );

    return years;
  }

  return null;
};

export const isValid = (date, fromFormat = 'YYYY/MM/DD') => {
  if (date) {
    return moment(date, fromFormat).isValid();
  }

  return false;
};

export const isValidDate = (date) => {
  if (date) {
    return moment(date).isValid();
  }

  return false;
};

export const compareDateSameOrAfter = (
  fromDate,
  toDate,
  fromFormat = 'YYYY-MM-DD HH:mm:ss',
) => moment(fromDate, fromFormat).isSameOrAfter(moment(toDate, fromFormat));

export const compareDateSameOrBefore = (
  fromDate,
  toDate,
  fromFormat = 'YYYY-MM-DD HH:mm:ss',
) => moment(fromDate, fromFormat).isSameOrBefore(moment(toDate, fromFormat));

export const compareDateBefore = (
  fromDate,
  toDate,
  fromFormat = 'YYYY-MM-DD HH:mm:ss',
) => moment(fromDate, fromFormat).isBefore(moment(toDate, fromFormat));

export const formatDateFromText = (date, delimiter = '/') =>
  moment(
    `${
      date.substring(0, 4)
      + delimiter
      + date.substring(4, 6)
      + delimiter
      + date.substring(6, 8)
    }`,
  ).toDate();

export const formatTimeFromText = (current, time, type = 'number') => {
  const date = formatDate(current.toISOString(), 'YYYY-MM-DD');
  let dateTime;
  if (type === 'number') {
    dateTime = moment(
      `${date} ${time.substring(0, 2)}:${time.substring(2, 4)}:00`,
    );
  } else if (Constants.REGEX.RULE.SHORT_TIME.test(time)) {
    dateTime = moment(`${date} ${time}:00`);
  }
  if (dateTime && dateTime.isValid()) {
    return dateTime.toDate();
  }
  return undefined;
};

export const dateIsAfter = (fromDate, toDate) => {
  if (!!fromDate && !!toDate) {
    return moment(fromDate).isAfter(moment(toDate));
  }
};
