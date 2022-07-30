import React from 'react'
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    var userIsLoggedIn = window.localStorage.getItem("JAED_IS_LOGGED_IN");
    if (userIsLoggedIn==="false") navigate("/login");
  });
  return (
    <>
      <h1>Welcome to the Portal WebPage</h1>
      <div class="aspect-w-16 aspect-h-9">
          <img class="w-full" src='images/JAEDBANNER.jpg' alt="" />
      </div>
    </>
  )
}

export default Portal
