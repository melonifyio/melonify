import { getAuth } from "firebase/auth";
import firebase from "./index";

const auth = getAuth(firebase);

export default auth;
