export function convertDate(dateString: string | undefined | Date) {
  const date = new Date(dateString || '');
  if (date.toString() === 'Invalid Date') return '';
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

export const convertTime = (date: string): string => {
  const newDate = new Date(date);

  if (newDate.toString() === 'Invalid Date') return '';
  const year = newDate.getFullYear();
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const day = `0${newDate.getDate()}`.slice(-2);
  const hours = `0${newDate.getHours() % 12}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  const isPM = newDate.getHours() >= 12;

  const dateString = `${year}/${month}/${day} ${hours === '0' ? '12' : hours}:${minutes} ${
    isPM ? 'PM' : 'AM'
  }`;
  return dateString;
};
