// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Note: Firebase client config is safe to expose — security is handled by Firebase Security Rules.
const firebaseConfig = {
  apiKey: "REMOVED_KEY",
  authDomain: "connection-crm.firebaseapp.com",
  projectId: "connection-crm",
  storageBucket: "connection-crm.firebasestorage.app",
  messagingSenderId: "561033372566",
  appId: "1:561033372566:web:6f09526269fa9eba4533b7",
  measurementId: "G-PD4VHETK9M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch {
    // Analytics may fail in some environments — that's fine
  }
}

export { analytics };
