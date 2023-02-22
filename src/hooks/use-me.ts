import { useAuthUser } from "@react-query-firebase/auth";

import auth from "config/firebase/auth";

const useMe = () => {
  const user = useAuthUser(["user"], auth);
  return user;
};

export default useMe;
