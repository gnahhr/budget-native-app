import MONTHS from "../constants/months";

export const formatDate = (input) => {
  const date = new Date(input).getDate();
  const month = new Date(input).getMonth();
  const year = new Date(input).getFullYear();

  return `${MONTHS[month]} ${date}, ${year}`;
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