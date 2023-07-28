import moment from 'moment';
import { checkDate } from './date-manipulation';

export const manipulateDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    'januari',
    'februari',
    'maret',
    'april',
    'mei',
    'juni',
    'juli',
    'agustus',
    'september',
    'oktober',
    'november',
    'desember',
  ];

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export const dateToString = (value: Date): string => {
  const date = checkDate(value);
  return moment(date).format('MMM Do YY');
};

export const dateToStringFromNow = (value: Date): string => {
  const date = checkDate(value);
  return moment(date).endOf('day').fromNow();
};

export const manipulateMoney = (amount: number) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export const manipulateRangeLoan = (range: number) => {
  return range * 30;
};

export function convertSeparator(numberStr: string): string {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return numberStr.replace(regex, '.');
}

export function filterTextToNumberOnly(input: string): string {
  const numericCharacters: RegExpMatchArray | null = input.match(/\d+/g);
  const result: string = numericCharacters ? numericCharacters.join('') : '';

  return result;
}
