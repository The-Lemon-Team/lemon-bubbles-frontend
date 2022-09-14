import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from '@firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(firebaseApp, {});
export const firebaseAuth = getAuth(firebaseApp);
