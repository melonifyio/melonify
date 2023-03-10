type DateValueProps = any;

const isTimestamp = (value: DateValueProps) => {
  return typeof value === "object" && value?.seconds;
};

export const formatDate = (value: DateValueProps): string => {
  if (isTimestamp(value)) {
    return value.toDate().toDateString();
  }

  return "N/A";
};
