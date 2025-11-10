// Firebase v9 modular SDK
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigComplete = Object.values(firebaseConfig).every((v) => typeof v === 'string' && v.length > 0)

export let app = null
export let db = null

try {
  if (isConfigComplete) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } else {
    console.warn('Firebase config missing. Add values to .env to enable contact form.')
  }
} catch (e) {
  console.error('Failed to initialize Firebase:', e)
}
