export const dateAddDay = (result: Date, days: number) => {
  const date = checkDate(result);
  date.setDate(date.getDate() + days);
  return date;
};

export const checkDate = (val: string | Date) => {
  try {
    if (val instanceof Date) return val;
    return new Date(val);
  } catch (err) {
    return new Date();
  }
};

export function dateDifference(startDate: Date, endDate: Date) {
  const start = checkDate(startDate);
  const end = checkDate(endDate);
  const diffInMilliseconds = end.getTime() - start.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays;
}

export function monthDifference(startDate: Date, endDate: Date) {
  const start = checkDate(startDate);
  const end = checkDate(endDate);
  const diffInDays = dateDifference(start, end);
  const diffInMonths = diffInDays / 30;
  return Math.round(diffInMonths);
}
