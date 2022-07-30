import { Outlet } from "react-router-dom";
import OffcanvasComp from '../components/OffcanvasComp';
import { useState, useEffect } from "react";

const Layout = (props) => {
  useEffect(() => {
    fetch('data/ipaddress.json') //fetch online data here
    .then((response) => response.json())
    .then((data) => {
        window.localStorage.setItem("JAED_IP",data.results.ip);
    });
  });
  return (
    <>
      <OffcanvasComp userName={props.userName}/>
      <br/>
      <br/>
      <Outlet />
    </>
  )
};

export default Layout;