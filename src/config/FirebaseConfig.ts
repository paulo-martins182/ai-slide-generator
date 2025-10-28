/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAI,
  getGenerativeModel,
  getLiveGenerativeModel,
  GoogleAIBackend,
  ResponseModality,
} from "firebase/ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCikDiMJRtekFH2kEfsCnIVwgnKltXwcfE",
  authDomain: "ollio-ppt.firebaseapp.com",
  projectId: "ollio-ppt",
  storageBucket: "ollio-ppt.firebasestorage.app",
  messagingSenderId: "634337132479",
  appId: "1:634337132479:web:2dc286643a93c6ea7a6b0a",
  measurementId: "G-7NPJ298YS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseDb = getFirestore(app);

const ai = getAI(app, { backend: new GoogleAIBackend() });
export const GeminiAiModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
});

export const GeminiAiLiveModel = getLiveGenerativeModel(ai, {
  model: "gemini-2.0-flash-live-001",
  generationConfig: {
    responseModalities: [ResponseModality.TEXT],
  },
});
