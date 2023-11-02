import React, { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const Firebasecontext = createContext();

const auth = getAuth(app);
const storage = getStorage(app);
const database = getFirestore(app);
const google = new GoogleAuthProvider();

const FirebaseProvider = ({ children }) => {
  const signup = async ({ email, password, displayName }) => {
    try {
      let userinfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      return userinfo.user;
    } catch (error) {
      console.log("error in firebase - ", error);
      return null;
    }
  };

  const Login = async ({ email, password }) => {
    try {
      let userinfo = await signInWithEmailAndPassword(auth, email, password);
      return userinfo.user;
    } catch (error) {
      console.log("error in firebase - ", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const uplodefile = async ({
    title,
    slug,
    file,
    summary,
    Content,
    userid,
    username
  }) => {
    try {
      let imageref = ref(
        storage,
        "Blog-Image/" + file.name.split(" ").join("-")
      );
      let image = await uploadBytes(imageref, file);
      if (image.ref.fullPath) {
        let doc = await addDoc(collection(database, "blogs"), {
          title,
          slug,
          thumbnail: image.ref.fullPath,
          Content,
          userid,
          username,
          summary,
        });
        console.log(doc);
        return true;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error in uploding image ", error);
      return null;
    }
  };

  const getallposts = async () => {
    try {
      let posts = await getDocs(collection(database, "blogs"));
      return posts.docs;
    } catch (error) {
      console.log("error in get all post => ", error);
      return null;
    }
  };

  const getSinglePost = async (postid) => {
    try {
      let docRef = doc(database, "blogs", postid);
      let post = await getDoc(docRef);
      if (post) {
        return post.data();
      }
      return null;
    } catch (error) {
      console.log("ERROR IN FIREBASE GET SINGLE POST METHOD -", error);
      return null;
    }
  };

  const getImage = async (path) => {
    try {
      let url = await getDownloadURL(ref(storage, path));
      return url || null;
    } catch (error) {
      console.log("ERROR IN FIREBASE GET Image METHOD -", error);
      return null;
    }
  };

  const deletePost = async (postid) => {
    try {
      await deleteDoc(doc(database, "blogs", postid));
      return true;
    } catch (error) {
      console.log("ERROR IN FIREBASE DELETE POST METHOD", error);
      return null;
    }
  };

  const updatePost = async (postid,data) => {
    try {
      let res = await updateDoc(doc(database, "blogs", postid), {
        ...data
      });
      return true;
    } catch (error) {
      console.log("ERROR IN FIREBASE UPDATE POST METHOD -", error);
      return null;
    }
  };

const signupwithgoogle = async () => {
  try {
    let res = await signInWithPopup(auth,google)
    return res.user || null
  } catch (error) {
    console.log("error in google sign up" ,error)
  }
}
  return (
    <Firebasecontext.Provider
      value={{
        signup,
        Login,
        logout,
        uplodefile,
        getallposts,
        getSinglePost,
        getImage,
        deletePost,
        updatePost,
        signupwithgoogle
      }}
    >
      {children}
    </Firebasecontext.Provider>
  );
};

export default FirebaseProvider;

export const useFirebaseContext = () => useContext(Firebasecontext);
