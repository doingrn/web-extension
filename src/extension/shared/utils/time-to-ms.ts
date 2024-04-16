export const timeToMs = (time: string, format: 'hh:mm:ss' | 'hh:mm' | 'mm:ss' | 'ss') => {
  // Split the time string into hours, minutes, and seconds
  const timeArray = time.split(':').map(Number);

  // Convert the time to milliseconds based on the format
  switch (format) {
    case 'hh:mm:ss':
      return timeArray[0] * 3600000 + timeArray[1] * 60000 + timeArray[2] * 1000;
    case 'hh:mm':
      return timeArray[0] * 3600000 + timeArray[1] * 60000;
    case 'mm:ss':
      return timeArray[0] * 60000 + timeArray[1] * 1000;
    case 'ss':
      return timeArray[0] * 1000;
    default:
      return 0;
  }
};
