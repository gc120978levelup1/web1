import isEmpty from 'lodash.isempty';
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Tooltip from 'react-bootstrap/Tooltip';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import GoogleMap from '../components/GoogleMap';
import '../examples/MapModeler.css';

var CryptoJS = require("crypto-js");

const CoolerMap = (props) => {
    let {id,cid} = useParams();
    const ip = window.localStorage.getItem("JAED_IP");
  const navigate = useNavigate();
  const [userName,setUserName] = useState("");
  const [userPassword1,setUserPassword1] = useState("");
  const [userEncryptedData,setUserEncryptedData] = useState("");
  const [userDecryptedData,setUserDecryptedData] = useState(null);
  const [formShow,setFormShow]  = useState(false);
  const [modalformShow,setModalFormShow]  = useState(false);
  const [gmap,setGMap]  = useState(null);
  const [gmaps,setGMaps]  = useState(null);
  const [gmapLocator,setGMapLocator]  = useState(null);
  const [gmarkers,setgmarkers] = useState([]);
  const [ginfowindows,setginfowindows] = useState([]);
  const [gxlines,setgxlines] = useState([]);
  const [ginfowindowsLines,setginfowindowsLines] = useState([]);
  const [gswingbusmarkers,setgswingbusmarkers] = useState([]);


    const [DTs,setDTs] = useState([]);
    const [Custs,setCusts] = useState([]);
    const [Poles,setPoles] = useState([]);
    const [PLines,setPLines] = useState([]);
    const [propsDTFile] = useState(props.DTFile);
    const [propsCustFile] = useState(props.CustFile);
    const [propsPriPoleFile] = useState(props.PriPoleFile);
    const [propsPriLineFile] = useState(props.PriLineFile);

    const tooltip = (
        <Tooltip id="tooltip-disabled">Enter Customer Account Number and click me.</Tooltip>
    );
    const tooltip1 = (
        <Tooltip id="tooltip-disabled">Click me to close search window!</Tooltip>
    );

    const [searchValue, setSearchValue] = useState('');
    async function onSearchButtonClickHandler(){
        navigate(`/`);
        const ip = window.localStorage.getItem("JAED_IP");
        console.log(`${ip}custsongeojsons/ofcid/${searchValue}`);
        const results = await fetch(`${ip}custsongeojsons/ofcid/${searchValue}`).then((response) => response.json());
        //window.localStorage.setItem("JAED_CUSTOMER_ID",results[0].cid);
        navigate(`/CoolMap/${results[0].geojson_id}/searchcid/${results[0].cid}`);
    }

    /*
    function onSearchButtonClickHandler(){
      var found = false;
      Custs.forEach((Cust) => {
        if (Cust.properties.CustomerID==userName){
          const lat = Cust.geometry.coordinates[1];
          const lng = Cust.geometry.coordinates[0];  
           var newCenter = new gmaps.LatLng(lat, lng);
           gmapLocator.setPosition(newCenter);
           gmap.panTo(newCenter); 
           gmap.setZoom(18);
           Cust.infowindow.open(gmap, Cust.marker);
           found = true;
           return 0; 
           //2038002100   
        }
      });
      if (!found) setModalFormShow(true);
    }
    */

    const getMapBounds = (map, maps, DTs) => {
        const bounds = new maps.LatLngBounds();
        DTs.forEach((DT) => {
          bounds.extend(new maps.LatLng(
            DT.geometry.coordinates[1],
            DT.geometry.coordinates[0],
          ));
        });
        return bounds;
      };
      
      // Re-center map when resizing the window
      const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
          maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
          });
        });
      };
      
      //Foratting for point inforation that will pop after clicking a point
      const getInfoWindowStringDT = (DT) => (`
          <div>
            <div style="font-size: 16px;">
              ${DT.properties.XmerID}
            </div>
            <div style="font-size: 14px;">
              <span style="color: grey;">
              ${DT.properties.xKVA} kVA
              </span>
            </div>
            <div style="font-size: 14px; color: grey;">
              ${DT.properties.percentZ}percentImpedance
            </div>
            <div style="font-size: 14px; color: grey;">
              ${DT.properties.percentI}percentImpedanceIex
            </div>
            <div style="font-size: 14px; color: green;">
              ${DT.properties.Configuration}
            </div>
          </div>
          `);
      
      //Foratting for point inforation that will pop after clicking a point
      const getInfoWindowStringCust = (Cust) => (`
          <div>
            <div style="font-size: 16px;">
              ${Cust.properties.CustomerID}
            </div>
            <div style="font-size: 14px;">
              <span style="color: grey;">
              ${Cust.properties.CustomerName}
              </span>
            </div>
            <div style="font-size: 14px; color: grey;">
              ${Cust.properties.Address}
            </div>
            <div style="font-size: 14px; color: grey;">
              ${Cust.properties.CustomerType}
            </div>
            <div style="font-size: 14px; color: green;">
              ${Cust.properties.KWHR_month}kWh
            </div>
          </div>
          `);
      
      
      //Foratting for point inforation that will pop after clicking a point
      const getInfoWindowStringPole= (Pole) => (`
          <div>
            <div style="font-size: 16px;">
              ${Pole.properties.PoleID}
            </div>
            <div style="font-size: 14px;">
              <span style="color: grey;">
              ${Pole.properties.Phase}
              </span>
            </div>
            <div style="font-size: 14px; color: grey;">
              ${Pole.properties.StructureType1}
            </div>
            <div style="font-size: 14px; color: grey;">
              ${Pole.properties.Height}ft
            </div>
            <div style="font-size: 14px; color: green;">
              ${Pole.properties.PoleType}
            </div>
          </div>
          `);
      
      //Foratting for point inforation that will pop after clicking a point
      const getInfoWindowStringPLine= (PLine) => (`
          <div>
            <div style="font-size: 16px;">
              ${PLine.properties.SectionID}
            </div>
            <div style="font-size: 14px;">
              <span style="color: grey;">
              ${PLine.properties.FromBus} - ${PLine.properties.ToBus} 
              </span>
            </div>
            <div style="font-size: 14px; color: grey;">
              ${PLine.properties.Phase} ${PLine.properties.length}m
            </div>
            <div style="font-size: 14px; color: grey;">
              P${PLine.properties.PhaseCondSize} ${PLine.properties.PhaseCondType} ${PLine.properties.PhaseCondUnit}
            </div>
            <div style="font-size: 14px; color: green;">
              N${PLine.properties.NeutralCondSize} ${PLine.properties.NeutralCondType} ${PLine.properties.NeutralCondUnit}
            </div>
          </div>
          `);
          
async function refreshGoogleMapData(map, maps){
  var bounds =  map.getBounds();
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();

  const svgMarkerDT = {
    //path: "M 0 0 S 5 10 10 0 Z M 0 0 S 5 -10 10 0 Z",
    path: "M 0 0 L 10 0 L 5 -10 Z",
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.3,
    anchor: new maps.Point(0, 0),
  };

  const svgMarkerSST = {
    path: "M 0 0 L 10 0 L 5 -10 Z M 10 0 L 20 0 L 15 -10 Z",
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new maps.Point(10, -5),
  };

  const svgMarkerLocator = {
    path: "M 0 0 L -24 24 L -15 24 L -15 50 L 0 50 Z M 0 0 L 24 24 L 15 24 L 15 50 L 0 50 Z",
    fillColor: "#FFE900",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 45,
    scale: 1.5,
    anchor: new maps.Point(-3, -4),
  };

  const svgMarkerSSTFrame = {
    path: "M 0 0 L 24 0 L 24 -14 L 0 -14 Z",
    fillColor: "#FFE900",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new maps.Point(12, -7),
  };

  const svgMarkerCust = {
    path: "M 0 0 S 5 10 10 0 Z M 0 0 S 5 -10 10 0 Z",
    //path: "M 0 0 L 10 0 L 5 -10 Z",
    fillColor: "brown",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.8,
    anchor: new maps.Point(0, 0),
  };

  const svgMarkerPole = {
    path: "M 0 0 S 5 10 10 0 Z M 0 0 S 5 -10 10 0 Z",
    fillColor: "green",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: new maps.Point(5, 0),
  };

  const markers = [];
  const infowindows = [];
  const xlines = [];
  const infowindowsLines = [];
  const swingbusmarkers = [];
  var maplocator = null;

  const DTLimit = 30;
  var inserted = 0;
  for (let DT of DTs){
    const lat = DT.geometry.coordinates[1];
    const lng = DT.geometry.coordinates[0];
    if ((sw.lat() < lat) && (sw.lng() < lng) && (ne.lat() > lat) && (ne.lng() > lng) && (DTLimit > inserted)){
      inserted++;
      markers.push(new maps.Marker({
        position: {
          lat: DT.geometry.coordinates[1],
          lng: DT.geometry.coordinates[0],
        },
        icon: svgMarkerDT,
      }));
      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowStringDT(DT),
      }));
    } 
    if ((DTLimit === inserted)&&(DTLimit > inserted)) break;
  };

  const CustsLimit = 200;
  inserted = 0;
  for (let Cust of Custs){
    const lat = Cust.geometry.coordinates[1];
    const lng = Cust.geometry.coordinates[0];
    if ((sw.lat() < lat) && (sw.lng() < lng) && (ne.lat() > lat) && (ne.lng() > lng) && (CustsLimit > inserted)){
      inserted++;
    const gCust = new maps.Marker({
      position: {
        lat: Cust.geometry.coordinates[1],
        lng: Cust.geometry.coordinates[0],
      },
      icon: svgMarkerCust,
    });
    markers.push(gCust);
    const infowin = new maps.InfoWindow({
      content: getInfoWindowStringCust(Cust),
    })
    infowindows.push(infowin);
    Cust.marker = gCust;
    Cust.infowindow = infowin; 
  }
  if ((CustsLimit === inserted)&&(CustsLimit > inserted)) break;
  };

  const PoleLimit = 100;
  inserted = 0;
  for (let Pole of Poles){
    const lat = Pole.geometry.coordinates[1];
    const lng = Pole.geometry.coordinates[0];
    if ((sw.lat() < lat) && (sw.lng() < lng) && (ne.lat() > lat) && (ne.lng() > lng) && (PoleLimit > inserted)){
      inserted++;
      markers.push(new maps.Marker({
          position: {
            lat: Pole.geometry.coordinates[1],
            lng: Pole.geometry.coordinates[0],
          },
          icon: svgMarkerPole,
      }));
    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowStringPole(Pole),
    }));
  }
  if ((PoleLimit === inserted)&&(PoleLimit > inserted)) break;
  };

  PLines.forEach((PLine) => {       
    const flightPlanCoordinates = [{
                                          lat: PLine.geometry.coordinates[0][1],
                                          lng: PLine.geometry.coordinates[0][0],
                                      },
                                      {
                                          lat: PLine.geometry.coordinates[1][1],
                                          lng: PLine.geometry.coordinates[1][0],
                                  }];
    var Phases = PLine.properties.Phase.length - 1;
    var lineColor = "#9acd32";
    if ((Phases === 1) && PLine.properties.Phase.includes("A")) lineColor = "#FF0000"; else
    if ((Phases === 1) && PLine.properties.Phase.includes("B")) lineColor = "#0000FF"; else
    if ((Phases === 1) && PLine.properties.Phase.includes("C")) lineColor = "#00FFFF"; else 
    if ((Phases === 2) && PLine.properties.Phase.includes("A") && PLine.properties.Phase.includes("B")) lineColor = "#FFA500"; else
    if ((Phases === 2) && PLine.properties.Phase.includes("B") && PLine.properties.Phase.includes("C")) lineColor = "#8F00FF"; else
    if ((Phases === 2) && PLine.properties.Phase.includes("C") && PLine.properties.Phase.includes("A")) lineColor = "#FF1493";
    var flightPath = new maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: false,
                strokeOpacity: 1.0,
                strokeColor: lineColor,
                strokeWeight: Phases
              });
    xlines.push(flightPath);
    if (PLine.properties.FromBus === "SWINGBUS"){
      const xx1 = new maps.Marker({
        position: {
          lat: PLine.geometry.coordinates[0][1],
          lng: PLine.geometry.coordinates[0][0],
        },
        icon: svgMarkerSSTFrame,
      });
      swingbusmarkers.push(xx1);
      const xx2 = new maps.Marker({
        position: {
          lat: PLine.geometry.coordinates[0][1],
          lng: PLine.geometry.coordinates[0][0],
        },
        icon: svgMarkerSST,
      });
      swingbusmarkers.push(xx2);
    }
    infowindowsLines.push(new maps.InfoWindow({
      content: getInfoWindowStringPLine(PLine),
    }));
  });

  const xy = new maps.Marker({
    position: {
      lat: 0,
      lng: 0,
    },
    draggable:false,
    icon: svgMarkerLocator,
  }); 
  maplocator = xy;

  //assign click listener for each marker
  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });

  //assign click listener for each line
  xlines.forEach((xline, i) => {
    xline.addListener('click', (event) => {
      infowindowsLines[i].setPosition(event.latLng);
      infowindowsLines[i].open(map);
    });
  });

  for (let i = 0; i < xlines.length; i++) {
    xlines[i].setMap(map);
  }

  for (let i = 0; i < gxlines.length; i++) {
    gxlines[i].setMap(null);
  }

  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }

  for (let i = 0; i < gmarkers.length; i++) {
    gmarkers[i].setMap(null);
  }

  for (let i = 0; i < swingbusmarkers.length; i++) {
    swingbusmarkers[i].setMap(map);
  }

  for (let i = 0; i < gswingbusmarkers.length; i++) {
    gswingbusmarkers[i].setMap(null);
  }

  maplocator.setMap(map);
  if (gmapLocator!==null) gmapLocator.setMap(null);
  
  setgmarkers([...markers]);
  setgxlines([...xlines]);
  setgswingbusmarkers([...swingbusmarkers]);
  setGMapLocator(maplocator);

  setginfowindows([...infowindows]);
  setginfowindowsLines([...infowindowsLines]);
  
  return(maplocator);
}
// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, DTs, Custs, Poles, PLines) => {
    setGMap(map);
    setGMaps(maps);
    //map.addListener("bounds_changed", () => {
    //  refreshGoogleMapData(map, maps);
    //});
    console.log("sugod");
    refreshGoogleMapData(map, maps).then(
      function(value) { 
        /* code if successful */ 
        Custs.every((Cust) => { //center the map in the found customer
          if (Cust.properties.CustomerID===cid){
            const lat = Cust.geometry.coordinates[1];
            const lng = Cust.geometry.coordinates[0];  
             var newCenter = new maps.LatLng(lat, lng);
             value.setPosition(newCenter);
             map.panTo(newCenter); 
             map.setZoom(18);
             refreshGoogleMapData(map, maps);
             if (Cust.infowindow!==null) Cust.infowindow.open(map, Cust.marker);
             return false;
             //2038002100   
          }
          return true;
        });
      },
      function(error) { 
        /* code if some error */ 
      }
    );
    const xbounds = getMapBounds(map, maps, DTs);
    // Fit map to bounds
    map.fitBounds(xbounds); //kapoi neh kay sa selpon mupakoy
    // Bind the resize listener
    //bindResizeListener(map, maps, bounds);
  };

    function gDecrypt(encData){
        var bytes3 = CryptoJS.AES.decrypt(encData, 'garry123');
        const xPLineData = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));  
        return xPLineData;
    }

    async function fetchInitialData(){
        window.localStorage.setItem("JAED_LAST_MAP_ID",id);
        console.log(`${ip}geojsons/${id}`);
        let mapfile = await fetch(`${ip}geojsons/${id}`).then((response) => response.json());
        //console.log(`${ip}geojsonfiles/${mapfile.DTData}`);
        //console.log(`${ip}geojsonfiles/${mapfile.CustData}`);
        //console.log(`${ip}geojsonfiles/${mapfile.PoleData}`);
        //console.log(`${ip}geojsonfiles/${mapfile.PLineData}`);
        console.log(`${ip}geojsonfiles/${mapfile.DTData}`);
        let DTData = await fetch(`${ip}geojsonfiles/${mapfile.DTData}`).then((response) => response.json());
        console.log(`${ip}geojsonfiles/${mapfile.CustData}`);
        let CustData = await fetch(`${ip}geojsonfiles/${mapfile.CustData}`).then((response) => response.json());
        console.log(`${ip}geojsonfiles/${mapfile.PoleData}`);
        let PoleData = await fetch(`${ip}geojsonfiles/${mapfile.PoleData}`).then((response) => response.json());
        console.log(`${ip}geojsonfiles/${mapfile.PLineData}`);
        let PLineData= await fetch(`${ip}geojsonfiles/${mapfile.PLineData}`).then((response) => response.json());
        setDTs(gDecrypt(DTData.DataFile).features);
        setCusts(gDecrypt(CustData.DataFile).features);
        setPoles(gDecrypt(PoleData.DataFile).features);
        setPLines(gDecrypt(PLineData.DataFile).features);
    }


    useEffect(() => {
      var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
      if (userIsLoggedIn==="false") navigate("/login");
      const ip = window.localStorage.getItem("JAED_IP");
      console.log(`${ip}loginlist`);
      fetch(`${ip}loginlist`) //fetch online data here
      .then((response) => response.json())
      .then((data) => {
          setUserEncryptedData(data.encrypted);
      });
      fetchInitialData();
    },[]);

  return (
    <>
    {(!isEmpty(DTs)||!isEmpty(Custs)||!isEmpty(Poles)||!isEmpty(PLines)) && (
      <div className="ex1">
        <GoogleMap
          defaultZoom={18}
          defaultCenter={[0, 0]}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, DTs, Custs, Poles, PLines)}
        />
        <Button variant="primary absButtonTopLeft" onClick = {()=>{setFormShow(!formShow)}}>::::</Button>
        <Button variant="success absButtonTopLeft1" onClick = {()=>{refreshGoogleMapData(gmap, gmaps)}}>{`(|)`}</Button>
        <ToastContainer className='absFormTopLeft'>
                    <Toast delay={3000}  show={formShow} bg={"Danger"} key={"Danger"} onClose={()=>{setFormShow(false)}}>
                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip1}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""  />
                            <strong className="me-auto">SEARCH</strong>
                            <small className="text-muted" onClick={()=>{setFormShow(false)}}>
                                <Badge bg="secondary" ></Badge>
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                                <FloatingLabel controlId="floatingInput" label="Account Number" className="mb-3">
                                    <Form.Control type="text" placeholder="xxxxxxxxxxx" onChange={(e)=>{setSearchValue(e.target.value);}}/>
                                </FloatingLabel>
                                <div className='py-2 px-0 rounded-md w-full flex justify-end'>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='danger shadow-lg p-2 ' onClick = {()=>onSearchButtonClickHandler()}><i class="fa fa-search"></i>&nbsp;&nbsp;Search</Button> 
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                <Modal show={modalformShow} onHide={()=>setModalFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Attention
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Customer NOT FOUND! {':('}...</h5>
                        </div>
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Thank you for trying... <Spinner animation="border" variant="primary" hidden={false}/></h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success shadow-lg p-2" onClick={()=>setModalFormShow(false)}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;OK
                        </Button>
                    </Modal.Footer>
                </Modal>
      </div>
    )}
    </>
  )
}

export default CoolerMap
