import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUK8PATxElMN_uhOna4jlxZlLRsv8ycNs',
  authDomain: 'task7-1-15a4f.firebaseapp.com',
  databaseURL: 'https://task7-1-15a4f-default-rtdb.firebaseio.com',
  projectId: 'task7-1-15a4f',
  storageBucket: 'task7-1-15a4f.appspot.com',
  messagingSenderId: '617805583727',
  appId: '1:617805583727:web:33808ca82f023211bc049a',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = firebase.firestore();
export const createUserDocument = async (
  user,
  name,

  type,
  typex,
  types,
  password
) => {
  if (!user) return;

  const displayName = name;
  const pass = password;

  const type1 = type;
  const buildingN = typex;
  const roomN = types;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;

    try {
      await userRef.set({
        email,
        displayName,

        pass,

        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};

export default app;
