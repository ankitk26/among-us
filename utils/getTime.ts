import dayjs from "dayjs";

export const getTime = (timestamp: string): string => {
  return dayjs(Number(timestamp)).format("MMM DD, YYYY");
};
