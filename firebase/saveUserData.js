import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveUserData = async (uid, name, email) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      createdAt: new Date(),
    });
    console.log("✅ User data saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving user data:", error);
  }
};
