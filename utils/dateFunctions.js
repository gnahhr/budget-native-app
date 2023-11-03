import MONTHS from "../constants/months";

export const getDateToday = (noTime = true, type = "string") => {
  const date = new Date(Date.now());
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Singapore",
  };

  if (!noTime) {
    options = {
      ...options,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }
  }

  if (type === "ISO") {
    options = {
      ...options,
      month: "numeric",
    }
  } else if (type === "24H") {
    options = {
      ...options,
      month: "numeric",
      hour12: false,
    }
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const getDateTodayISO = () => {
  const date = new Date(Date.now());
  const newDate = new Intl.DateTimeFormat('en-GB', {timeZone: "Singapore"}).format(date);
  return newDate.split('/').reverse().join('-');
}

export const formatDatePicker = (date) => {
  const dateTrim = date.split(' ')[0];
  return dateTrim.split('/').join('-');
}

export const getDateWithOffset = (date, value) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + value);
  return newDate.toISOString().split('T')[0];
}

export const getWeeklyStartEnd = (date) => {
  let newDate = new Date(date);
  let today = newDate.getDay();
  const startDate = new Date(newDate.setDate(newDate.getDate() - today));
  let endDate = new Date(newDate.setDate(newDate.getDate() + 6));
  
  return [startDate, endDate];
}

export const getWeeklyOffset = ([startDate, endDate], value) => {
  let newStartDate = new Date(startDate.setDate(startDate.getDate() + value));
  let newEndDate = new Date(endDate.setDate(endDate.getDate() + value));
  
  return [newStartDate, newEndDate];
}

export const getMonthOffset = (date, value) => {
   let newDate = date.split('-').map(x => Number(x));

   if (newDate[1] + value > 12) {
    newDate[0] = newDate[0]+value;
    newDate[1] = 1;
   } else if (newDate[1] + value < 0){
    newDate[0] = newDate[0]+value;
    newDate[1] = 12;
   } else {
    newDate[1] = newDate[1] + value;
   }

   return newDate.join('-');
};

export const getYearOffset = (date, value) => {
  return Number(date) + Number(value);
}

export const formatDate = (input) => {
  const date = new Date(input).getDate();
  const month = new Date(input).getMonth();
  const year = new Date(input).getFullYear();

  return `${MONTHS[month]} ${date}, ${year}`;
}

export const formatWeekly = ([startDate, endDate]) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export const extractMonth = (input) => {
  const month = new Date(input).getMonth();
  const year = new Date(input).getFullYear();

  return `${MONTHS[month]} ${year}`;
}

export const extractYear = (input) => {
  const year = new Date(input).getFullYear();

  return `${year}`;
}

export const compareDate = (date1, date2) => {
  const dateL = new Date(date1).getDate();
  const monthL = new Date(date1).getMonth();
  const yearL = new Date(date1).getFullYear();

  const dateR = new Date(date2).getDate();
  const monthR = new Date(date2).getMonth();
  const yearR = new Date(date2).getFullYear();

  if (yearL > yearR) {
    return false;
  } else if (monthL > monthR) {
    return false;
  } else if (dateR > dateL) {
    return false;
  } else if (dateR === dateL){
    return false;
  } else {
    return true;
  }
};