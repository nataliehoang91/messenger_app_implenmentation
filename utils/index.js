import { parseISO, format } from "date-fns";

export const stringAvatar = (name) => ({
  children: `${name.split(" ")[0][0]}`,
});

export const formatDateTime = (params) => {
  if (!!params) {
    const date = parseISO(params);
    const formattedDate = format(date, "do MMM yy hh:mm a");
    return formattedDate;
  }
  return "";
};
