import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Article from "./pages/Article";
import Homepage from "./pages/Homepage";
import Homelayout from "./layout/Homelayout";
import Loginpage from "./pages/Auth/Loginpage";
import Signuppage from "./pages/Auth/Signuppage";
import NotFound from "./pages/NotFound";
import Authwraper from "./component/Authwraper";
import { Toaster } from "react-hot-toast";
import { login,logout } from "./Slice/userSlice";
import { useDispatch } from "react-redux";
import Addarticle from "./pages/Addarticle";
import Singlearticle from "./pages/Singlearticle";
import app from "./firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const App = () => {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(login({ user }));
    } else {
      dispatch(logout());
    }
  });

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homelayout />}>
          <Route index element={<Homepage />} />
          <Route path="article" element={<Article />} />
          <Route path="about" element={<About />} />
          <Route path="article/:id" element={<Singlearticle />} />
          <Route
            path="addarticle"
            element={
              <Authwraper auth={true}>
                <Addarticle />
              </Authwraper>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <Authwraper auth={false}>
              <Loginpage />
            </Authwraper>
          }
        />
        <Route
          path="/signup"
          element={
            <Authwraper auth={false}>
              <Signuppage />
            </Authwraper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
