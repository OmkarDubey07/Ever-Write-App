import React from "react";
import { useDispatch } from "react-redux";
import authServices from "../../EverWrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authServices.Logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 max-sm:px-4 py-2 border  border-blue-900 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default LogoutBtn;
