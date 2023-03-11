import { Timestamp } from "firebase/firestore";

export const convertTimestampToDate = (timestamp: Timestamp): Date => {
  return timestamp instanceof Timestamp
    ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
    : timestamp;
};
