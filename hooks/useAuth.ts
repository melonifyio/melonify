import { useAuthUser } from "@react-query-firebase/auth";

import auth from "../firebase/auth";

const useMe = () => {
  const user = useAuthUser(["user"], auth);
  return user;
};

export default useMe;
