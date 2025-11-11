import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDag1mtzUeBGKpIk1kXl9fQ9cXfECBmAqI",
  authDomain: "zamzoom-b9088.firebaseapp.com",
  projectId: "zamzoom-b9088",
  storageBucket: "zamzoom-b9088.firebasestorage.app",
  messagingSenderId: "1087058101275",
  appId: "1:1087058101275:web:b3887e3a0b3ad1347e24be",
  measurementId: "G-MH6X12KWQ0"
}

// Initialize Firebase only on client side
let app: any = null
let db: any = null
let auth: any = null
let storage: any = null

if (typeof window !== 'undefined') {
  console.log('Initializing Firebase on client...')
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  db = getFirestore(app)
  auth = getAuth(app)
  storage = getStorage(app)
}

export { db, auth, storage }

// Analytics removed to prevent SSR issues