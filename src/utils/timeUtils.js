import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export function convertDate(date, timeFrame) {
  let newDate;

  let optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let optionsHour = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let dayString = new Date(date).toLocaleDateString("es-MX", optionsDate);
  //dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
  let initHourString = new Date(date)
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);
  let endHour = new Date(
    new Date(date).getTime() + (timeFrame - 1) * 1000 * 60
  );
  let endHourString = endHour
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);
  newDate = [dayString, initHourString, endHourString];

  return newDate;
}

export function getDateString(date) {
  let optionsDay = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let optionsHour = {
    hour: "numeric",
    minute: "numeric",
  };

  const dayString = new Date(date).toLocaleDateString("es-MX", optionsDay);
  const hourString = new Date(date)
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);

  const dateString = [dayString, hourString];

  return dateString;
}
