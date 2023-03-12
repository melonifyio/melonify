import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp();

const db = getFirestore();

export const updateNeverLoggedIn = functions.auth
  .user()
  .beforeSignIn(async (user) => {
    const userRef = db.collection("users").doc(user.email || "unknown");

    const userDoc = await userRef.get();

    if (userDoc.data()?.neverSigneIn) {
      await userRef.set(
        {
          neverSigneIn: false,
        },
        { merge: true }
      );
    }
  });
