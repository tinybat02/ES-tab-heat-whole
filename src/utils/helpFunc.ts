import { hours, weekdays, mappingWeekToArrayIndex } from '../config/constant';
import { DayObj, DayOfWeek } from '../types';
// import moment from 'moment';
import moment from 'moment-timezone';
// import toDate from 'date-fns/toDate';
// import { utcToZonedTime, format } from 'date-fns-tz';

export const processData = (valueArr: number[], timestampArr: number[]) => {
  const keepTrackWeek: Array<{ [key: string]: number }> = [];
  // const timeZone = 'Europe/Berlin';

  const templateTable = weekdays.map(weekday => {
    const obj: DayObj = { date: weekday };
    hours.map(hour => {
      obj[hour] = 0;
    });
    const { date, ...rest } = obj;
    keepTrackWeek.push(rest);
    return obj;
  });

  timestampArr.map((timestamp, idx) => {
    const date = moment(timestamp).tz('Europe/Berlin');
    const dayOfWeek = date.locale('en').format('ddd') as DayOfWeek;
    const hour = date.format('HH');
    // const zonedDate = utcToZonedTime(toDate(timestamp), timeZone);
    // const dayOfWeek = format(zonedDate, 'eee', { timeZone }) as DayOfWeek;
    // const hour = format(zonedDate, 'HH', { timeZone });

    if (dayOfWeek !== 'Sun' && hours.includes(hour)) {
      templateTable[mappingWeekToArrayIndex[dayOfWeek]][hour] += valueArr[idx];
      keepTrackWeek[mappingWeekToArrayIndex[dayOfWeek]][hour] += 1;
    }
  });

  for (let i = 0; i < 6; i++) {
    hours.map(hour => {
      if (templateTable[i][hour] == 0) {
        templateTable[i][hour] = null;
      } else {
        templateTable[i][hour] = Math.round((templateTable[i][hour] / keepTrackWeek[i][hour]) * 100) / 100;
      }
    });
  }
  return { data: templateTable };
};
