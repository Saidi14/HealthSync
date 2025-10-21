// UserService.js
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const saveUserData = async (userId, name, email) => {
  try {
    await setDoc(doc(db, "users", userId), {
      name,
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
