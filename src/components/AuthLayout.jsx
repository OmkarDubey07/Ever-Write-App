import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authenticaion = true }) {
  const navigator = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authenticaion && authStatus !== authenticaion) {
        navigator('/login')
    } else if(!authenticaion && authStatus !== authenticaion) {
        navigator('/')
    }
    setLoader(false)
  }, [authStatus, navigator, authenticaion]);

  return loader ? <h1>Loading... </h1> : <>{children}</> ; 
}
