export const formatDateForField = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toISOString().split(".")[0];
};

export const formatDateForTable = (isoString: string): string => {
  const date = new Date(isoString);

  const convertDate = date.toISOString().split(".")[0].replace("T", " ");

  return convertDate;
};
