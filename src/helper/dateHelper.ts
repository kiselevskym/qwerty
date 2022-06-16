type GetCurrentDayReturn = { date: Date; formatedDate: string };
const getCurrentDay = (): GetCurrentDayReturn => {
  const date = new Date();
  const formatedDate = `${date.getDay()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return { date, formatedDate };
};

export { getCurrentDay };
