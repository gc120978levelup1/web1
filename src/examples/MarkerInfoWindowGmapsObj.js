import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import GoogleMap from '../components/GoogleMap';

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from '../const/la_center';


// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
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
const getInfoWindowString = (place) => (`
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>
    `);

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
  
  //const image = {
    //url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //  url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
  //  size: new maps.Size(20, 20),
  //  origin: new maps.Point(0, 0),
  //  anchor: new maps.Point(0, 20),
  //};

  const svgMarker = {
    path: "M 0 0 S 5 10 10 0 Z M 0 0 S 5 -10 10 0 Z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: new maps.Point(0, 0),
  };

  const markers = [];
  const infowindows = [];
  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      icon: svgMarker,
      //icon: image,
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });

  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json') //fetch online data here
      .then((response) => response.json())
      .then((data) => {
        //data.results.forEach((result) => {
        //  result.show = false; // eslint-disable-line no-param-reassign
        //});
        this.setState({ places: data.results });
        this.setState({ poles: data.results });//this is a trial only
      });
  }

  render() {
    const { places, poles } = this.state;

    return (
      <>
        {(!isEmpty(places)||!isEmpty(poles)) && (
          <GoogleMap
            defaultZoom={3}
            defaultCenter={LOS_ANGELES_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        )}
      </>
    );
  }
}

export default MarkerInfoWindowGmapsObj;
