import { initializeApp } from "firebase/app";
import { config } from "../../Config/config";



const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket:config.storageBucket,
  messagingSenderId:config.senderId,
  appId: config.appid
};

const app = initializeApp(firebaseConfig);

export default app 