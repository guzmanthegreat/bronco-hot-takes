import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

export async function getPublicProfile(userId) {
  const profileSnapshot = await getDoc(doc(db, "publicProfiles", userId));
  return profileSnapshot.exists() ? profileSnapshot.data() : null;
}
