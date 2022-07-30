import React from 'react'
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
var CryptoJS = require("crypto-js");

const FeedersontownsList = (props) => {
    const navigate = useNavigate();
    const [xlist, setList] = useState([]);
    
    useEffect(() => {
        const ip = window.localStorage.getItem("JAED_IP");
        console.log(`${ip}feeders`);
        fetch(`${ip}feeders`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    },[]);

    function getFeederName(feeder_id){
        var ret = "feeder not known";
        xlist.forEach((feeder)=>{
            if (feeder._id===feeder_id) ret = feeder.name;
        });
        return ret
    }

    function getFeederAddress(feeder_id){
        var ret = "feeder not known";
        xlist.forEach((feeder)=>{
            if (feeder._id===feeder_id) ret = feeder.address;
        });
        return ret
    }

    function getGeoJSONID(feeder_id){
        var ret = "feeder not known";
        xlist.forEach((feeder)=>{
            if (feeder._id===feeder_id) ret = feeder.geojson_id;
        });
        return ret
    }

    async function OnGotoMapClickHandler(geojson_id){
        window.localStorage.setItem("JAED_geojson_id",geojson_id);
        navigate(`/CoolMap/${geojson_id}`);
    }

  return (
    <>
        {props.items.feeders.map((x) => { return(
                <div className="bg-gray-200 p-2 m-2 drop-shadow rounded  border-2 border-blue-300">
                    <Button onClick={()=>OnGotoMapClickHandler(getGeoJSONID(x.feeder_id))}>Goto Map</Button>
                    &nbsp;{'>>>'}&nbsp;
                    <b>{getFeederName(x.feeder_id)}</b>&nbsp;&nbsp;<p>{getFeederAddress(x.feeder_id)}</p>
                    {getGeoJSONID(x.feeder_id)}
                </div>)}
        )}
    </>
  )
}

export default FeedersontownsList
