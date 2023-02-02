import firebase from "./index";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase);

export default auth;
