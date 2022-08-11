import { eachDayOfInterval, format } from 'date-fns';
import { DateData } from 'react-native-calendars';

import { MarkedDateProps } from '.';
import theme from '../../styles/theme';
import { addDaysToDate } from '../../utils/addDaysToDate';

export function generateInterval(
  startDate: DateData,
  endDate: DateData
): MarkedDateProps {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(startDate.timestamp),
    end: new Date(endDate.timestamp),
  }).forEach((date) => {
    const formattedDate = format(addDaysToDate(date), 'yyyy-MM-dd');
    interval = {
      ...interval,
      [formattedDate]: {
        color:
          startDate.dateString === formattedDate ||
          endDate.dateString === formattedDate
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          startDate.dateString === formattedDate ||
          endDate.dateString === formattedDate
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
