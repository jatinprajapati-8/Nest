import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authwraper = ({ children, auth }) => {
  const {user} = useSelector ((state) => state.userstate);

  let isAuthRequired = auth;
  return isAuthRequired ? (
    user ? (
      children
    ) : (
      <Navigate to={"/login"} />
    )
  ) : (
    children
  );
};

export default Authwraper;
