import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import GoogleMap from '../components/GoogleMap';
import mapCENTER from '../const/la_center';

// Return map bounds based on list of places
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
        ${PLine.properties.Phase}
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
    scale: 2.5,
    anchor: new maps.Point(0, 0),
  };

  const svgMarkerSSTFrame = {
    path: "M 0 0 L 24 0 L 24 -14 L 0 -14 Z",
    fillColor: "#FFE900",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2.5,
    anchor: new maps.Point(2, -2),
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
    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowStringCust(Cust),
    }));
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
      var x = new maps.Marker({
        position: {
          lat: PLine.geometry.coordinates[0][1],
          lng: PLine.geometry.coordinates[0][0],
        },
        icon: svgMarkerSSTFrame,
        map,
      });
      var y = new maps.Marker({
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

class MapDT extends Component {
  constructor(props) {
    super(props);
    this.state = {
         DTs: [],
       Custs: [],
       Poles: [],
      PLines: []
    };
  }

  componentDidMount() {
    
    fetch(props.DTFile) //fetch online data here
      .then((response) => response.json())
      .then((data) => {
        //data.results.forEach((result) => {
        //  result.show = false; // eslint-disable-line no-param-reassign
        //});
        this.setState({ DTs: data.features});
      });
      
      
      fetch(props.CustFile) //fetch online data here
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Custs: data.features});
      });
      
      fetch('linedata/vf3_pripole.geojson') //fetch online data here
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Poles: data.features});
      });
      
      fetch('linedata/vf3_priline.geojson') //fetch online data here
      .then((response) => response.json())
      .then((data) => {
        this.setState({ PLines: data.features});
      });
      
  }

  render() {
    const { DTs } = this.state;
    const { Custs } = this.state;
    const { Poles } = this.state;
    const { PLines} = this.state;
    return (
      <>
        {(!isEmpty(DTs)||!isEmpty(Custs)||!isEmpty(Poles)||!isEmpty(PLines)) && (
          <div className="App ex1">
            <GoogleMap
              defaultZoom={3}
              defaultCenter={mapCENTER}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, DTs, Custs, Poles, PLines)}
            />
          </div>
        )}
      </>
    );
  }
}

export default MapDT;
