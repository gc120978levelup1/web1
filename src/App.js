import {React,useState,useEffect} from 'react';
import './App.css';
import MapModeler from './examples/MapModeler';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';
import Portal from './pages/Portal';
import EmptyPage from './pages/EmptyPage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CreateUser from './pages/CreateUser';
import Public from './pages/Public';
import DeleteUser from './pages/DeleteUser';
import Towns from './pages/Towns';
import Feeders from './pages/Feeders';
import Substations from './pages/Substations';
import CoolMap from './pages/CoolMap';
import CoolerMap from './pages/CoolerMap';
import MapPerTown from './pages/MapPerTown';
import MapPerSubstation from './pages/MapPerSubstation';
import Xtest from './pages/xtest';

function App() {
  const [userName,setUserName] = useState(window.localStorage.getItem("JAED_USERNAME_IN"));
  useEffect(() => {
    var userIsLoggedIn = window.localStorage.getItem("JAED_IS_LOGGED_IN");
    if (userIsLoggedIn === "true") setUserName(window.localStorage.getItem("JAED_USERNAME_IN"));
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userName={userName}/>}>
            <Route index element={<Public />} />
            <Route path="home" element={<Home />} />
            <Route path="createuser" element={<CreateUser/>} />
            <Route path="deleteuser" element={<DeleteUser/>} />
            <Route path="logout" element={<Logout userName={userName} setUserName={setUserName}/>} />
            <Route path="login" element={<Login userName={userName} setUserName={setUserName}/>} />
            <Route path="portal" element={<Portal/>} />
            <Route path="Towns" element={<Towns/>} />
            <Route path="Feeders" element={<Feeders/>} />
            <Route path="Substations" element={<Substations/>} />
            <Route path="CoolMap/:id" element={<CoolerMap />} />
            <Route path="CoolMap/:id/searchcid/:cid" element={<CoolerMap />} />
            <Route path="MapPerTown" element={<MapPerTown/>} />
            <Route path="MapPerSubstation" element={<MapPerSubstation/>} />
            <Route path="Xtest" element={<Xtest/>} />
            <Route index path="map" element={<MapModeler DTFile='linedata/vf3_distxmer.geojson' CustFile='linedata/vf3_cons.geojson' PriPoleFile='linedata/vf3_pripole.geojson' PriLineFile='linedata/vf3_priline.geojson' />} />
            <Route path="*" element={<EmptyPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
