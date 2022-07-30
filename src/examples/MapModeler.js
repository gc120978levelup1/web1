import React from 'react';
import isEmpty from 'lodash.isempty';
import GoogleMap from '../components/GoogleMap';
import './MapModeler.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Badge from 'react-bootstrap/Badge';
import Tooltip from 'react-bootstrap/Tooltip';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

var CryptoJS = require("crypto-js");

const MapModeler = (props) => {
  const navigate = useNavigate();
  navigate(`/CoolMap/${window.localStorage.getItem("JAED_LAST_MAP_ID")}`);
  const [userName,setUserName] = useState("");
  const [userPassword1,setUserPassword1] = useState("");
  const [userEncryptedData,setUserEncryptedData] = useState("");
  const [userDecryptedData,setUserDecryptedData] = useState(null);
  const [formShow,setFormShow]  = useState(false);
  const [modalformShow,setModalFormShow]  = useState(false);
  const [gmap,setGMap]  = useState(null);
  const [gmaps,setGMaps]  = useState(null);
  const [gmapLocator,setGMapLocator]  = useState(null);


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

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, DTs, Custs, Poles, PLines) => {
    setGMap(map);
    setGMaps(maps);
    //const image = {
      //url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    //  url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    //  size: new maps.Size(20, 20),
    //  origin: new maps.Point(0, 0),
    //  anchor: new maps.Point(0, 20),
    //};
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
  
    DTs.forEach((DT) => {
      markers.push(new maps.Marker({
        position: {
          lat: DT.geometry.coordinates[1],
          lng: DT.geometry.coordinates[0],
        },
        icon: svgMarkerDT,
        //icon: image,
        map,
      }));
  
      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowStringDT(DT),
      }));
    });
  
    Custs.forEach((Cust) => {
      const gCust = new maps.Marker({
        position: {
          lat: Cust.geometry.coordinates[1],
          lng: Cust.geometry.coordinates[0],
        },
        icon: svgMarkerCust,
      });
      gCust.setMap(map);
      markers.push(gCust);
      const infowin = new maps.InfoWindow({
        content: getInfoWindowStringCust(Cust),
      })
      infowindows.push(infowin);
      Cust.marker = gCust;
      Cust.infowindow = infowin;
    });
  
    Poles.forEach((Pole) => {
      markers.push(new maps.Marker({
        position: {
          lat: Pole.geometry.coordinates[1],
          lng: Pole.geometry.coordinates[0],
        },
        icon: svgMarkerPole,
        map,
      }));
      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowStringPole(Pole),
      }));
    });

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
      flightPath.setMap(map);
      xlines.push(flightPath);
      if (PLine.properties.FromBus === "SWINGBUS"){
        new maps.Marker({
          position: {
            lat: PLine.geometry.coordinates[0][1],
            lng: PLine.geometry.coordinates[0][0],
          },
          icon: svgMarkerSSTFrame,
          map,
        });
        new maps.Marker({
          position: {
            lat: PLine.geometry.coordinates[0][1],
            lng: PLine.geometry.coordinates[0][0],
          },
          icon: svgMarkerSST,
          map,
        });
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
      draggable:true,
      icon: svgMarkerLocator,
      map,
    }); 
    setGMapLocator(xy);

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
  
    const bounds = getMapBounds(map, maps, DTs);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

    useEffect(() => {
      var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
      if (userIsLoggedIn==="false") navigate("/login");
      const ip = window.localStorage.getItem("JAED_IP");
      fetch(`${ip}loginlist`) //fetch online data here
      .then((response) => response.json())
      .then((data) => {
          setUserEncryptedData(data.encrypted);
          var bytes = CryptoJS.AES.decrypt(userEncryptedData, 'garry123');
          setUserDecryptedData (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
      });
        fetch(propsDTFile) //fetch online data here
        .then((response) => response.json())
        .then((data) => {
          setDTs(data.features);
        });
        
        fetch(propsCustFile) //fetch online data here
        .then((response) => response.json())
        .then((data) => {
          setCusts(data.features);
        });
        
        fetch(propsPriPoleFile) //fetch online data here
        .then((response) => response.json())
        .then((data) => {
          setPoles(data.features);
        });
        
        fetch(propsPriLineFile) //fetch online data here
        .then((response) => response.json())
        .then((data) => {
          setPLines(data.features);
        });

    },[propsDTFile,propsCustFile,propsPriPoleFile,propsPriLineFile]);

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
        <Button variant="primary absButtonTopLeft" onClick = {()=>{setFormShow(!formShow)}}>:::</Button>
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
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setUserName(e.target.value);}}/>
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

export default MapModeler
