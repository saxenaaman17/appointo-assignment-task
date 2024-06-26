import { Value } from "../reducers/homeReducer";

export const formatDate = (date: Value): string => {
  if (date && !Array.isArray(date)) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return "";
};

export const formatTime = (datewithTime: string): string => {
  const dateTime = new Date(datewithTime);

  // extract the hours (0-23) and minutes (0-59)
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // decide AM or PM
  const amOrPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

export const getNextMonthFirstDate = (activeStartDate: Date): Date => {
  const year = activeStartDate.getFullYear();
  const month = activeStartDate.getMonth();

  // get next month's first date
  const nextMonthFirstDate = new Date(year, month + 1, 1);

  // make sure December to January transition works fine
  if (nextMonthFirstDate.getMonth() !== (month + 1) % 12) {
    nextMonthFirstDate.setFullYear(year + 1);
  }

  return nextMonthFirstDate;
}
