import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, onSnapshot, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export interface UserSettings {
  isDarkMode: boolean;
  isMarianMode: boolean;
  notificationsEnabled: boolean;
  selectedVoice: string;
  language: 'fr' | 'en';
}

export interface FirestoreUser extends UserSettings {
  updatedAt: any;
}

export interface FirestoreFavorite {
  prayerId: string;
  addedAt: any;
}

export const syncUserSettings = async (userId: string, settings: UserSettings) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    await updateDoc(userRef, {
      ...settings,
      updatedAt: serverTimestamp()
    });
  } else {
    await setDoc(userRef, {
      ...settings,
      updatedAt: serverTimestamp()
    });
  }
};

export const addFavorite = async (userId: string, prayerId: string) => {
  const favoriteRef = doc(db, 'users', userId, 'favorites', prayerId);
  await setDoc(favoriteRef, {
    prayerId,
    addedAt: serverTimestamp()
  });
};

export const removeFavorite = async (userId: string, prayerId: string) => {
  const favoriteRef = doc(db, 'users', userId, 'favorites', prayerId);
  await deleteDoc(favoriteRef);
};

export type { FirebaseUser };
