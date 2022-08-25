export function formatDate(timestamp, format) {
  const fullDate = new Date(timestamp);
  const dateOptions = (format === 'forMessage')
    ? { dateStyle: 'short', hour12:true, timeStyle: 'short' }
    : { year: 'numeric', month: 'short', day: 'numeric' }
  const usDate = new Intl.DateTimeFormat("en-US", dateOptions).format(fullDate);

  return usDate;
};
