import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS6Ov0-YISkrfSTOeOSKtQUBn5xNNchCM",
  authDomain: "thesis-app-aa717.firebaseapp.com",
  projectId: "thesis-app-aa717",
  storageBucket: "thesis-app-aa717.appspot.com",
  messagingSenderId: "638949390880",
  appId: "1:638949390880:web:989e71ec978f7aadcb9a45",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
